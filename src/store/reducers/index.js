import { combineReducers } from 'redux'
import counter from './counter'
import records from './records'

export default combineReducers({
  counter,
  records
})
