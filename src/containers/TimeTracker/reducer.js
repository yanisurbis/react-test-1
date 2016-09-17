import {
  // for taskReducer
  ADD_TASK,
  CHANGE_TASK_NAME,
  DELETE_TASK,
  RESUME_TASK,
  // for inputReducer
  CHANGE_TASK_NAME_INPUT,
  CHANGE_TASK_PRICE_INPUT,
  TICK_TIMER,
  RESET_INPUT_AND_TIMER,
} from './constants'

const INITIAL_STATE = {
  taskNameInput: ``,
  taskPriceInput: ``,
  time: 0,
  tasks: [],
}

export const timeTrackerReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action
  
  switch (action.type) {
    case CHANGE_TASK_NAME_INPUT:
      return {
        ...state,
        taskNameInput: payload.taskNameInput,
      }
    case CHANGE_TASK_PRICE_INPUT:
      return {
        ...state,
        taskPriceInput: payload.taskPriceInput,
      }
    case TICK_TIMER:
      return {
        ...state,
        time: state.time + 1,
      }
    case RESET_INPUT_AND_TIMER:
      return {
        ...state,
        taskNameInput: ``,
        taskPriceInput: ``,
        time: 0,
      }
    case RESUME_TASK:
      // timer isn't ticking
        // prev task -> input

      // timer is ticking
        // input -> tasks
        // then
        // prev task -> input

      if (state.time === 0) {
        return {
          ...state,
          taskNameInput: payload.taskName,
          taskPriceInput: payload.taskPrice,
          time         : 0,
        }
      } else {
        return {
          taskNameInput: payload.taskName,
          taskPriceInput: payload.taskPrice,
          time         : 0,
          tasks        : [
            ...state.tasks,
            {
              taskId: payload.taskId,
              taskName: state.taskNameInput,
              taskPrice: state.taskPriceInput,
              taskTime: state.time,
            }
          ]
        }
      }
    case ADD_TASK:
      if (payload.taskName === '')
        payload.taskName = `(づ｡◕‿‿◕｡)づ --> NONAME`

      return {
        ...state,
        tasks : [
          ...state.tasks,
          payload,
        ]
      }
    case CHANGE_TASK_NAME:

      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.taskId === payload.taskId) {
            return {
              ...task,
              taskName: payload.taskName === ''
                        ? `(づ｡◕‿‿◕｡)づ --> STILL NONAME`
                        : payload.taskName
            }
          } else {
            return task
          }
        })
      }
    case DELETE_TASK:

      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          return task.taskId !== payload.taskId
        })
      }
    default:
      return state
  }
}

