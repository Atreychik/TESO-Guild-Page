import { api } from '../../services'
import {
  SET_AUTHORIZED,
  GET_USER_INFO,
  LOGOUT
} from '../types'

const login = (code) => (dispatch) => {
  return api.discord.login(code)
    .then(response => {
      dispatch(getUser(`${response.token_type} ${response.access_token}`))
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

const getUser = (token) => (dispatch) => {
  return api.discord.getUserInfo(token)
    .then(response => {
      dispatch({
        type: GET_USER_INFO,
        payload: response.data
      })
    })
}

const checkAuthorization = () => (dispatch) => {
  const token = localStorage.getItem('access_token')
  const tokenType = localStorage.getItem('token_type')
  const refreshToken = localStorage.getItem('refresh_token')

  if (token) {
    dispatch(getUser(`${tokenType} ${token}`))
    dispatch({
      type: SET_AUTHORIZED,
      payload: true
    })
  } else {
    if (refreshToken) {
      api.discord.refreshToken(refreshToken)
        .then(response => {
          dispatch(getUser(`${response.token_type} ${response.access_token}`))
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
