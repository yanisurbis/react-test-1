import React, { Component } from 'react'

class InputForm extends Component {

  constructor() {
    super()
    this.timer = null
  }
  
  startTicking = () => {
    const {tick} = this.props
    
    this.timer = setInterval(tick, 1000)
  }
  
  stopTicking = () => {
    clearInterval(this.timer)
    this.timer = null
  }
  
  onStartOrSubmitTask = (event) => {
    event.preventDefault()

    const {taskName, taskPrice, time} = this.props
    
    // function to use when it's already ticking
    const {addTask, reset} = this.props
    
    if (this.timer === null) {
      this.startTicking()
    } else {
      addTask(taskName, taskPrice, time)
      this.stopTicking()
      reset()
    }
  }

  onReset = () => {
    const {reset} = this.props

    this.stopTicking()
    reset()
  }

  render() {
    const {props} = this
    // time & timer
    const {renderTime, time} = props

    // for task name & task price
    const {
      changeTaskName,
      taskName,
      changeTaskPrice,
      taskPrice,
    } = props

    // text for first button
    const btnText = (() => {
      if (this.timer != null) {
        return `Submit`
      } else if (time != 0) {
        return `Continue`
      } else {
        return `Start`
      }
    })()

    console.log(taskPrice)

    return (
      <div className="">
        <h1>{renderTime(time)}</h1>
        <form
          onSubmit={this.onStartOrSubmitTask}
          className="form"
        >
          <div className="">
            <input
              ref         = {input => this.nameInput = input}
              onChange    = {() => changeTaskName(this.nameInput.value)}
              value       = {taskName}
              className   = "input"
              placeholder = "Task name"
              type        = "search"
              maxLength   = "50"
              autoFocus
            />
          </div>
          <div className="">
            <input
              ref         = {input => this.priceInput = input}
              onChange    = {() => changeTaskPrice(this.priceInput.value)}
              value       = {taskPrice}
              className   = "input"
              placeholder = "Price for hour"
              type        = "number"
              max         = "10000000"
              required
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="btn btn-primary"
            >
              {btnText}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick= {this.onReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    )
  }

}


export default InputForm

InputForm.propTypes = {
  renderTime      : React.PropTypes.func,
  time            : React.PropTypes.number,

  changeTaskName  : React.PropTypes.func,
  changeTaskPrice : React.PropTypes.func,

  addTask         : React.PropTypes.func,
  startTicking    : React.PropTypes.func,
  stopTicking     : React.PropTypes.func,

  reset           : React.PropTypes.func,

  taskName        : React.PropTypes.string,
  taskPrice       : React.PropTypes.string,

}
