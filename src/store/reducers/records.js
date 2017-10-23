import { handleActions } from 'redux-actions'
import { FETCH_RECORDS, FILTER_RECORDS } from '../types/records'

import { records } from '../../mock'

const initState = {
  filters: [{id: 'foisjdfodsf', name: '我的家人'}, {id: 'jfodsjfosdjfo', name: '我关注的'}],
  list: [],
  msg_count: 0,
  photo: '',
  bg_image: '',
  avatar: ''
}
export default handleActions({
  [FETCH_RECORDS] (state) {
    console.log(state)
    console.log(arguments)
    return {...state,
      list: records.data.list,
      msg_count: records.data.msg_count,
      photo: records.data.photo,
      bg_image: records.data.bg_image,
      avatar: records.data.avatar
    }
  },
  [FILTER_RECORDS] (state, payload) {
    return state
  }
}, initState)
