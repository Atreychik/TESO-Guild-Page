import {
  SET_AUTHORIZED,
  GET_USER_INFO
} from '../types'

const initialState = {
  isAuthorized: null,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHORIZED: {
      return {
        ...state,
        isAuthorized: action.payload
      }
    }
    case GET_USER_INFO: {
      return {
        ...state,
        user: action.payload
      }
    }
    default:
      return state
  }
}
