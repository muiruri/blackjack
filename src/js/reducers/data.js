import { LOAD_ACTIONS } from '../actions/actionTypes'

const data = (state = null, action) => {
  switch(action.type) {
    case LOAD_ACTIONS.LOADED:
      if(action.data != null) {
        return action.data
      }
      return state
    default:
      return state
  }
}

export default data
