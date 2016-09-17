import {
  ADD_TASK,
  CHANGE_TASK_NAME,
  DELETE_TASK,
  RESUME_TASK,

  CHANGE_TASK_NAME_INPUT,
  CHANGE_TASK_PRICE_INPUT,
  TICK_TIMER,
  RESET_INPUT_AND_TIMER
} from './constants'

import { getIndex } from '../../localStorage'

let taskId

// action creators for TASK COMPONENT

const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: {
      taskId
    }
  }
}

const changeTaskName = (taskId, taskName) => {
  return {
    type: CHANGE_TASK_NAME,
    payload: {
      taskId,
      taskName,
    }
  }
}

const resumeTask = (taskName, taskPrice) => {
  taskId = getIndex()
  return {
    type: RESUME_TASK,
    payload: {
      taskId,
      taskName,
      taskPrice,
    }
  }
}

/*
 * actions creators for InputForm component
 * */

const addTask = (taskName, taskPrice, taskTime) => {
  taskId = getIndex()
  return {
    type: ADD_TASK,
    payload: {
      taskId,
      taskName,
      taskPrice,
      taskTime,
    }
  }
}

const changeTaskNameInput = (taskNameInput) => {
  return {
    type: CHANGE_TASK_NAME_INPUT,
    payload: {
      taskNameInput,
    }
  }
}

const changeTaskPriceInput = (taskPriceInput) => {
  return {
    type: CHANGE_TASK_PRICE_INPUT,
    payload: {
      taskPriceInput,
    }
  }
}

const tickTimer = () => {
  return {
    type: TICK_TIMER, 
    payload: null
  }
}

const resetInputAndTimer = () => {
  return {
    type: RESET_INPUT_AND_TIMER,
    payload: null,
  }
}

export {
  // fot TASK COMPONENT
  deleteTask,
  changeTaskName,
  resumeTask,
  // for INPUTFORM COMPONENT
  addTask,
  changeTaskNameInput,
  changeTaskPriceInput,
  resetInputAndTimer,
  tickTimer,
}

