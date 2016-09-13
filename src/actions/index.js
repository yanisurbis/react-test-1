export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'
export const RESUME_TASK = 'RESUME_TASK'

let taskId = 0

export function addTask({taskName, taskPrice, taskTime}) {
  
  ++taskId
  
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

export function deleteTask(task) {
  
  return {
    type: DELETE_TASK,
    payload: {
      ...task      
    }
  }
}

// export function resumeTask(task) {}

export function changeTaskName(taskId, taskName, taskPrice, taskLength) {
  console.log("changeTaskName")

  return {
    type: CHANGE_TASK_NAME,
    payload: {
      taskId,
      taskName,
      taskPrice,
      taskLength,
    }
  }
}

