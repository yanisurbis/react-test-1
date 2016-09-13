import React, { Component } from 'react'
import { connect } from 'react-redux'

/*
* keypress problems
* gain calculation problem
* input focusing problem
* */

class Task extends Component {
  constructor(props) {
    super(props)

    let {taskName, taskPrice} = props

    this.state = {
      editingTaskName: false,
      editingTaskPrice: false,
      taskName: taskName,
      taskPrice: taskPrice,
      focus: true,
    }
  }

  onTaskNameClick = (event) => {

    this.prevTaskName = this.state.taskName
    console.log(event)

    this.setState({
      editingTaskName: true,
    })
  }

  onTaskNameChange = (event) => {

    this.setState({
      taskName: event.target.value,
      focus: false,
    })
  }

  onTaskNameBlur = () => {

    this.setState({
      editingTaskName: false,
      focus: true,
    })

    // if (this.prevTaskName != this.state.taskName) {
    //   this.props.changeTaskName(this.state.taskName, this.props.taskPrice, this.props.taskLength)
    // }
  }

  onTaskNameKeyPress = (event) => {

    let { keyCode } = event
    console.log(event)

    if (keyCode == 27) {
      this.setState({
        taskName: this.prevTaskName,
        editingTaskName: false,
      })
    }

  }

  // render time spent on a task
  renderTime = ([hours, minutes, seconds]) => {
    const withZero = number => number < 10 ? `0${number}` : `${number}`

    if (hours === 0) {
      return `${hours}:${withZero(minutes)}:${withZero(seconds)}`
    }
  }

  // render gain for a task
  renderGain = ({taskPrice, taskLength}) => {
    let [ hours, minutes] = taskLength

    let gain = (parseInt(taskPrice) * hours)
                + (parseInt(taskPrice) / (60 / minutes))

    return gain ? "0" : gain.toString()
  }
  
  render() {
    let { taskTime, taskId } = this.props
    let { taskName, taskPrice } = this.state

    return (
      <div className="task mt-15">
        { (this.state.editingTaskName) ?
          <input
            onChange={this.onTaskNameChange}
            onBlur={this.onTaskNameBlur}
            onKeyPress={this.onTaskNameKeyPress}
            ref={(input) => this.state.editingTaskName && this.state.focus ? input.focus() : null}
            className="input"
            type="text"
            placeholder="Task name"
            value={this.state.taskName}
          />
        :
          <div className="task-name"
            onClick={this.onTaskNameClick}
          >
            {taskName}
          </div>
        }
        <div className="ctn">
          <div className="row">
            <div className="col task-name">{taskPrice} rub/hr</div>
            <div className="col task-name">{this.renderTime(taskTime)}</div>
            { /* <div className="col task-name">{this.renderGain(this.props)} rub</div> */}
          </div>
        </div>
      </div>
    )
    // return (
    //   <div>Hello!</div>
    // )
  }
}

export default Task