import React from 'react'
import './Event.scss'

const Event = ({ event: { authorId, message } }) => (
  <div className='event'>
    <div>{authorId}</div>
    <div>{message}</div>
  </div>
)

export default Event
