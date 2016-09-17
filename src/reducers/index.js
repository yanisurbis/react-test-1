import { combineReducers } from 'redux'

import {
  timeTrackerReducer,
} from '../containers/TimeTracker/reducer'

const rootReducer = combineReducers({
  timeTracker: timeTrackerReducer,
})

export default rootReducer
