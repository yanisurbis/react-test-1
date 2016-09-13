import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTask, changeTaskName } from '../actions/index'
import Task from './task'

import Timer from '../helpers/timer'

/*
* tick abstraction?
*   start()
*   stop()
*   getArrayValue()
*   getStringValue1()
*   getStringValue2()
*   
* */

class TimeTracker extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      taskName: '',
      taskPrice: '',
      taskTime: null,
    }

    this.state = {...this.initialState}
  }

  onTaskNameChange = (event) => {
    this.setState({
      taskName: event.target.value,
    })
  }

  onTaskPriceChange = (event) => {
    this.setState({
      taskPrice: event.target.value,
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault()
    
    // if it's ticking - add task
    if (this.state.taskTime) {
      let { taskName, taskPrice, taskTime } = this.state

      this.props.addTask({
        taskName,
        taskPrice,
        taskTime,
      })

      this.setState({...this.initialState})
      
      Timer.stop(this)
      
    // if it isn't ticking - start ticking  
    } else {
      
      this.setState({
        taskTime: [0, 0, 0]
      })
      Timer.start(this)
    }
  }


  renderTasks = (task) => {

    // console.log(taskTime)
    // changeTaskName={this.props.changeTaskName(task.taskId)}
    
    return (
      <Task
        {...task}
        key={task.taskId.toString()}
      />
    )
  }

  renderTime = () => {

    if (this.state.taskTime) {
      const [hours, minutes, seconds] = this.state.taskTime

      const withZero = number => number < 10 ? `0${number}` : `${number}`

      if (hours === 0 && minutes == 0) {
        return `${seconds} sec`
      } else if (hours === 0) {
        return `${withZero(minutes)} : ${withZero(seconds)} min`
      } else {
        return `${withZero(hours)} : ${withZero(minutes)} : ${withZero(seconds)} hrs`
      }
    } else {
      return '0 sec'
    }
  }

  render() {
    console.log("tasks")
    console.log(this.props.tasks)
    
    let btnText = this.state.taskTime ? "Stop" : "Start"
    let taskTime = this.state.taskTime || [0, 0, 0]

    return (
      <div className="mt-15">
        <h1>{this.renderTime()}</h1>
        <form onSubmit={this.onFormSubmit}>
            <div className="ctn flex-center">
              <input
                onChange={this.onTaskNameChange}
                className="input"
                type="text"
                placeholder="Task name"
                value={this.state.taskName}
              />
            </div>
            <div className="ctn mt-15 flex-center">
              <input
                type="text"
                onChange={this.onTaskPriceChange}
                className="input"
                placeholder="Price for hour"
                value={this.state.taskPrice}
              />
            </div>
            <div className="ctn mt-15 flex-center">
              <button
                type="submit"
                className="btn-primary submit-btn">
                {btnText}
              </button>
            </div>
        </form>
        {this.props.tasks.map(this.renderTasks)}
      </div>
    )
  }
}

const mapStateToProps = ({ tasks }) => {
  return { tasks }
}

export default connect(mapStateToProps, { addTask, changeTaskName })(TimeTracker)