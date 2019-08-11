import axios from 'axios'
import { baseURL } from '../../constants'

const getEvents = () => {
  return axios({
    method: 'GET',
    url: `${baseURL.app}/events`
  })
}

export {
  getEvents
}
