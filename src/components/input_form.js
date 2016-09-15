import React, { Component } from 'react'

class InputForm extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      taskName: '',
      taskPrice: '',
      taskTime: null,
    }

    this.state = {...this.initialState}
  }

  onTaskNameChange = () => {
    this.setState({
      taskName: this.taskName.value,
    })
  }

  onTaskPriceChange = () => {
    this.setState({
      taskPrice: this.taskPrice.value,
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault()

    // if it isn't ticking - start ticking
    if (this.state.taskTime === null) {
      this.setState({
        taskTime: 0
      })

      this.timer = setInterval(this.click, 1000)
      
    // if it's ticking - add task
    } else {
      let {taskName, taskPrice, taskTime} = this.state

      this.props.addTask({
        taskName,
        taskPrice,
        taskTime,
      })

      this.setState({
        ...this.initialState
      })

      clearInterval(this.timer)
    }
  }

  click = () => {
    this.setState({
      taskTime: this.state.taskTime + 1
    })
  }

  render() {
    let btnText = this.state.taskTime ? "Stop" : "Start"
    
    return (
      <div className="">
        <h1>{this.props.renderTime(this.state.taskTime)}</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="">
            <input
              ref         = {input => this.taskName = input}
              onChange    = {this.onTaskNameChange}
              value       = {this.state.taskName}
              className   = "input"
              placeholder = "Task name"
              type        = "text"
            />
          </div>
          <div className="">
            <input
              ref         = {input => this.taskPrice = input}
              onChange    = {this.onTaskPriceChange}
              value       = {this.state.taskPrice}
              className   = "input"
              placeholder = "Price for hour"
              type        = "text"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className=""
            >
              {btnText}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default InputForm

// InputForm.propTypes = {
//  
// }
//
// InputForm.defaultProps = {
//  
// }