import React, { Component } from 'react'
import { connect }          from 'react-redux'

// actions
import {
  // for tasks list
  changeTaskName,
  deleteTask,
  resumeTask,
  // for input form
  addTask,
  changeTaskNameInput,
  changeTaskPriceInput,
  tickTimer,
  resetInputAndTimer,
} from './actions'

// components
import Task       from '../../components/Task/Task'
import InputForm  from '../../components/InputForm/InputForm'

// helpers methods for dealing with time and money presentation
/*
* TODO: validation
* TODO: deleting
* TODO: resuming
* TODO: styling
* TODO: form problem in general
* TODO: immutable
* TODO: testing
* */

const TimeTracker = (props) => {
  console.log("tasks in TimeTracker")
  console.log(props.timeTracker.tasks)
  console.log("other state")
  console.log(props.timeTracker)
  
  // for TASK COMPONENT
  // actions
  const {
    addTask,
    changeTaskName,
    deleteTask,
    resumeTask,
  } = props
  // values <-- redux state
  const {tasks} = props.timeTracker
  
  // for INPUTFORM COMPONENT
  // actions
  const {
    changeTaskNameInput,
    changeTaskPriceInput,
    resetInputAndTimer,
    tickTimer
  } = props
  // input values <-- redux state
  const {
    taskNameInput,
    taskPriceInput, 
    time
  } = props.timeTracker
  
  console.log(`taskPriceInput ${taskPriceInput}`)
  return (
    <div className="">
      <InputForm
        // actions
        addTask         = {addTask}
        changeTaskName  = {changeTaskNameInput}
        changeTaskPrice = {changeTaskPriceInput}
        tick            = {tickTimer}
        reset           = {resetInputAndTimer}
        // values
        taskName        = {taskNameInput}
        taskPrice       = {taskPriceInput}
        time            = {time}
      />
      {[...tasks].reverse().map((task) => {
        return (
          <Task
            // actions
            changeTaskName = {changeTaskName}
            deleteTask     = {deleteTask}
            resumeTask     = {resumeTask}
            // values
            {...task}
            key            = {task.taskId.toString()}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ timeTracker }) => ({ timeTracker })
export default connect(mapStateToProps, { 
  addTask,
  changeTaskName,
  changeTaskNameInput,
  changeTaskPriceInput, 
  //
  tickTimer,
  resetInputAndTimer,
  deleteTask,
  resumeTask,
})(TimeTracker)