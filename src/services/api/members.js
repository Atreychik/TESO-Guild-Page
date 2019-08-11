import axios from 'axios'
import { baseURL } from '../../constants'

const getMembers = () => {
  return axios({
    method: 'GET',
    url: `${baseURL.app}/members`
  })
}

export {
  getMembers
}
