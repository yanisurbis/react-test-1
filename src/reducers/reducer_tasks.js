import {
  ADD_TASK,
  CHANGE_TASK_NAME,
} from '../actions/index'

const INITIAL_STATE = []

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        action.payload
      ]
    case CHANGE_TASK_NAME:
      return state.map((task) => {

        if (task.taskId === action.payload.taskId) {
          return {
            ...task,
            taskName: action.payload.taskName,
          }
        } else {
          return task
        }
      })
    default:
      return state
  }
}

