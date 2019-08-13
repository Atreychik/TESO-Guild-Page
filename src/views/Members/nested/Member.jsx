import React from 'react'
import './Member.scss'

const Member = ({ member: { avatar, username, id, email } }) => (
  <div className='member'>
    <div className='member__avatar'>
      <img className='member__avatar-image' src={avatar || `https://loremflickr.com/320/240/dog?random=${id}`} alt={username} />
    </div>
    <div className='member__description'>
      <div>ID: {id}</div>
      <div>{username}</div>
      {/* <div>{email}</div> */}
    </div>
  </div>
)

export default Member
