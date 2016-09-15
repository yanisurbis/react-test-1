import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTask, changeTaskName } from '../actions/index'
import Task from './task'

import { 
  getStringRepresentationOfTime1,
  getStringRepresentationOfTime2,
  getStringRepresentationOfGain
} from '../helpers/timer'

/*
* TODO: validation
* TODO: deleting
* TODO: resuming
* TODO: caching
* TODO: styling
* TODO: gain problem
* TODO: key problem
* TODO: form problem in general
* TODO: immutable
* TODO: testing
* */

class TimeTracker extends Component {
  constructor(props) {
    super(props)

    // timer for time counting and string representation
    // TODO : ?
    // this.timer = timer

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

    // if it's ticking - add task
    if (this.state.taskTime) {
      let { taskName, taskPrice, taskTime } = this.state

      this.props.addTask({
        taskName,
        taskPrice,
        taskTime,
      })

      this.setState({
        ...this.initialState
      })

      clearInterval(this.timer)

    // if it isn't ticking - start ticking
    } else {

      this.setState({
        taskTime: 0
      })

      this.timer = setInterval(this.click, 1000)
    }
  }

  click = () => {
    this.setState({
      taskTime: this.state.taskTime + 1
    })
  }
  
  renderTasks = (task) => {

    // console.log(taskTime)
    // changeTaskName={this.props.changeTaskName(task.taskId)}
    
    return (
      <Task
        {...task}
        renderTime={getStringRepresentationOfTime2}
        renderGain={getStringRepresentationOfGain}
        changeTaskName={this.props.changeTaskName}
        key={task.taskId.toString()}
      />
    )
  }

  renderTime = () => {
    return getStringRepresentationOfTime1(this.state.taskTime)
  }

  render() {
    console.log("tasks")
    console.log(this.props.tasks)
    
    let btnText = this.state.taskTime ? "Stop" : "Start"


    return (
      <div className="">
        <h1>{this.renderTime()}</h1>
        <form onSubmit={this.onFormSubmit}>
            <div className="">
              <input
                type="text"
                ref={input => this.taskName = input}
                onChange={this.onTaskNameChange}
                className="input"
                placeholder="Task name"
                value={this.state.taskName}
              />
            </div>
            <div className="">
              <input
                type="text"
                ref={input => this.taskPrice = input}
                onChange={this.onTaskPriceChange}
                className="input"
                placeholder="Price for hour"
                value={this.state.taskPrice}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="">
                {btnText}
              </button>
            </div>
        </form>
        {this.props.tasks.map(this.renderTasks)}
      </div>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks })

export default connect(mapStateToProps, { addTask, changeTaskName })(TimeTracker)