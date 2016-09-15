export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'
export const RESUME_TASK = 'RESUME_TASK'

import { getIndex } from '../localStorage'

let taskId

export const addTask = ({taskName, taskPrice, taskTime}) => {
  console.log("adding task")
  // because idea has some parsing problems
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

// export const deleteTask = (task) => {
//
//   return {
//     type: DELETE_TASK,
//     payload: {
//       ...task
//     }
//   }
// }

// export function resumeTask(task) {}

export const changeTaskName = (taskId, taskName) => {

  return {
    type: CHANGE_TASK_NAME,
    payload: {
      taskId,
      taskName,
    }
  }
}

