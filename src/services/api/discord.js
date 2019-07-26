import axios from 'axios'
import { baseURL } from '../../constants'

const login = (code) => {
  return axios({
    method: 'POST',
    url: `${baseURL.app}/token/get`,
    data: {
      code
    }
  })
    .then(({ data }) => {
      setToken(data)
      return data
    })
}

const refreshToken = (token) => {
  return axios({
    method: 'POST',
    url: `${baseURL.app}/token/refresh`,
    data: {
      token
    }
  })
    .then(({ data }) => {
      setToken(data)
      return data
    })
}

const getUserInfo = (token) => {
  return axios({
    method: 'GET',
    url: `${baseURL.discord}/users/@me`,
    headers: {
      'Authorization': token
    }
  })
}

const setToken = (data) => {
  Object.keys(data).map(key => localStorage.setItem(key, data[key]))
}

export {
  login,
  refreshToken,
  getUserInfo
}
