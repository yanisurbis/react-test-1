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
      // find element with id
      let taskIndex = state.findIndex(elm => elm.taskId === action.payload.taskId)
      console.log(taskIndex)
      return [
        ...state.slice(0, taskIndex),
        action.payload,
        ...state.slice(taskIndex + 1)
      ]
      // construct new array
    default:
      return state
  }
}

