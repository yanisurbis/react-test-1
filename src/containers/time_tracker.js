import React, { Component } from 'react'
import { connect }          from 'react-redux'

// actions
import { 
  addTask,
  changeTaskName 
} from '../actions/index'

// components
import Task       from '../components/task'
import InputForm  from '../components/input_form'

// helpers methods for dealing with time and money
import { 
  getStringRepresentationOfTime1,
  getStringRepresentationOfTime2,
  getStringRepresentationOfGain,
  getStringRepresentationOfPrice
} from '../helpers/time_money'

/*
* TODO: validation
* TODO: deleting
* TODO: resuming
* TODO: caching
* TODO: styling
* TODO: gain problem
* TODO: form problem in general
* TODO: immutable
* TODO: testing
* */

const TimeTracker = (props) => {
  console.log("tasks")
  console.log(props.tasks)

  // actions
  const {addTask, changeTaskName} = props

  // redux state
  const {tasks} = props

  return (
    <div className="">
      <InputForm
        renderTime = {getStringRepresentationOfTime1}
        addTask    = {addTask}
      />
      {[...tasks].reverse().map((task) => {
        return (
          <Task
            {...task}
            renderTime     = {getStringRepresentationOfTime2}
            renderGain     = {getStringRepresentationOfGain}
            renderPrice    = {getStringRepresentationOfPrice}
            changeTaskName = {changeTaskName}
            key            = {task.taskId.toString()}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ tasks }) => ({ tasks })
export default connect(mapStateToProps, { addTask, changeTaskName })(TimeTracker)