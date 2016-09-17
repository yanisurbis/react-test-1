
// start with -1 because want our first task to have index = 0
let index = -1

// load state for Redux-state from localStorage
export const loadState = () => {
  try {

    const serializedState     = localStorage.getItem('timeTrackerState')

    if (serializedState === null) {
      return undefined
    } else {
      const state = JSON.parse(serializedState)

      // update lastIndex with the last index from saved state
      // need lastIndex to use it in actions to give proper taskId field for our tasks
      // need keys for rendering collections with React
      const {tasks} = state.timeTracker
      index = tasks[tasks.length - 1].taskId
      return state
    }
  } catch (err) {
    console.log("error in loadState")
    console.log(err)
  }
}

// save Redux-state to localStorage
export const saveState = (state) => {
  try {
    const serializedState     = JSON.stringify(state)
    localStorage.setItem('timeTrackerState', serializedState)
  } catch (err) {
    console.log("error in saveState")
    console.log(err)
  }
}

export const getIndex = () => {
  return ++index
}
