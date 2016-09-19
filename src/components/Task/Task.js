import React, { Component } from 'react'
import { connect } from 'react-redux'

import Time from '../Time/Time'
import Gain from '../Gain/Gain'
import Price from '../Price/Price'

/*
* component is aimed for rendering Task, yay!
*    it renders price, gain of the task that is rendered, and time for completion
*    it renders name of the task
*      we should be able to change that name
*        start state - simple text
*        after click on name - input -> change name
*        after esc, enter, in blur -> simple text
* */

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // to toggle representation of task name
      editingTaskName: false,
      taskName: null,
    }
  }

  startEditingTaskName = () => {
    const {taskName} = this.props

    this.setState({
      editingTaskName : true,
      // for input binding
      taskName        : taskName,
    })

    document.addEventListener('keydown', this.handleKeyPress);
  }

  stopEditingTaskName = () => {
    this.setState({
      editingTaskName: false,
      taskName: null,
    })

    document.removeEventListener('keydown', this.handleKeyPress);
  }

  // switching from text to input
  onTaskNameClick = () => {
    this.startEditingTaskName()
  }

  onTaskNameBlur = () => {
    this.changeTaskNameIfDiff()
  }

  handleKeyPress = (e) => {
    switch (e.keyCode) {
      // esc
      case 27:
        this.stopEditingTaskName()
        return
      // enter
      case 13:
        this.changeTaskNameIfDiff()
        return
    }
  }

  onTaskNameChange = () => {
    this.setState({
      taskName: this.inputTaskName.value,
    })

    console.log("VALUE")
    console.log(this.state.taskName)
  }

  changeTaskNameIfDiff = () => {
    // action creator
    const {changeTaskName} = this.props

    // get previous task name
    const {
      taskId,
      taskName: taskNamePrev,
    } = this.props

    // get current task name
    const {
      taskName: taskNameCurr,
    } = this.state

    // write if have changes
    if (taskNamePrev !== taskNameCurr) {
      changeTaskName(taskId, taskNameCurr)
    }

    this.stopEditingTaskName()
  }

  onTaskDelete = () => {
    const {
      taskId,

      deleteTask,
    }  = this.props

    deleteTask(taskId)
  }

  onTaskResume = () => {
    const {
      taskName,
      taskPrice,

      resumeTask
    } = this.props
    resumeTask(taskName, taskPrice)
  }
  
  render() {
    // task properties
    const {
      taskTime,
      taskName,
      taskPrice
    } = this.props

    return (
      <div className="row mt-15">
        <div className="col">
          { (this.state.editingTaskName) ?
            // if editing -> render as input
            <form className="form">
              <input
                ref           ={(input) => this.inputTaskName = input}
                onChange      ={this.onTaskNameChange}
                onBlur        ={this.onTaskNameBlur}
                className     ="input"
                type          ="text"
                placeholder   ="Task name"
                value         ={this.state.taskName}
                autoFocus
              />
            </form>
            :
            // if aren't editing - display simple text
            <div className=""
              onClick={this.onTaskNameClick}
            >
              {taskName}
            </div>
          }
          <Gain
            type        ="RUB"
            time        ={taskTime}
            ratePerHour ={taskPrice}
          />
          <Time
            time        ={taskTime}
            type        ="TASK"
          />
          <Price
            type        ="RUB"
            ratePerHour ={taskPrice}
          />
          <button
            type        ="submit"
            className   ="btn btn-primary"
            onClick     ={this.onTaskResume}
          >
            Resume
          </button>
          <button
            type        ="click"
            className   ="btn btn-danger"
            onClick     ={this.onTaskDelete}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default Task

Task.propTypes = {
  taskTime:       React.PropTypes.number,
  taskName:       React.PropTypes.string,
  taskPrice:      React.PropTypes.string,
  taskId    :     React.PropTypes.number,
  renderPrice:    React.PropTypes.func,
  renderTime:     React.PropTypes.func,
  renderGain:     React.PropTypes.func,
  changeTaskName: React.PropTypes.func
}