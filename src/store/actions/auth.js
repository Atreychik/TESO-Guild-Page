import { api } from '../../services'
import {
  SET_AUTHORIZED,
  GET_USER_INFO,
  LOGOUT
} from '../types'

const login = (code) => (dispatch) => {
  return api.discord.login(code)
    .then(response => {
      dispatch({
        type: SET_AUTHORIZED,
        payload: true
      })
    })
}

const logout = () => (dispatch) => {
  localStorage.clear()
  dispatch({ type: LOGOUT })
}

const getUser = (id) => (dispatch) => {
  return api.discord.getUserInfo(id)
    .then(response => {
      dispatch({
        type: GET_USER_INFO,
        payload: response.data
      })
    })
}

const checkAuthorization = (token, refreshToken, id) => (dispatch) => {
  if (token) {
    dispatch(getUser(id))
    dispatch({
      type: SET_AUTHORIZED,
      payload: true
    })
  } else {
    if (refreshToken) {
      api.discord.refreshToken(refreshToken)
        .then(response => {
          dispatch(getUser(id))
          dispatch({
            type: SET_AUTHORIZED,
            payload: true
          })
        })
    }
  }
}

export {
  login,
  logout,
  getUser,
  checkAuthorization
}
