import React, { Component } from 'react'
import { connect } from 'react-redux'


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

  onTaskNameClick = () => {

    this.prevTaskName = this.state.taskName

    this.setState({
      editingTaskName: true,
    })
  }

  onTaskNameChange = () => {

    this.setState({
      taskName: this.taskName.value,
      focus: false,
    })
  }

  onTaskNameBlur = () => {

    this.setState({
      editingTaskName: false,
      focus: true,
    })

    if (this.prevTaskName != this.state.taskName) {
      this.props.changeTaskName(this.props.taskId, this.state.taskName)
    }
  }

  // onTaskNameKeyPress = (event) => {
  //
  //   let { keyCode } = event
  //   console.log(event)
  //
  //   if (keyCode == 27) {
  //     this.setState({
  //       taskName: this.prevTaskName,
  //       editingTaskName: false,
  //     })
  //   }
  //
  // }

  // render time spent on a task
  

  // render gain for a task
  renderGain = ({taskPrice, taskTime}) => {
    let [ hours, minutes] = taskTime

    let gain = (parseInt(taskPrice) * hours)
                + (parseInt(taskPrice) / (60 / minutes))

    return gain ? "0" : gain.toString()
  }
  
  render() {
    let { taskTime } = this.props
    let { taskName, taskPrice } = this.state

    return (
      <div className="task mt-15">
        { (this.state.editingTaskName) ?
          <input
            ref={input => this.taskName = input }
            onChange={this.onTaskNameChange}
            onBlur={this.onTaskNameBlur}
            /* onKeyPress={this.onTaskNameKeyPress} */
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
            <div className="col task-name">{this.props.renderTime(taskTime)}</div>
            <div className="col task-name">{this.renderGain(this.props)} rub</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Task