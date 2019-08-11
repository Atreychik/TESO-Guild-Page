import React from 'react'
import './Member.scss'

const Member = ({ member: { avatar, username, id, email } }) => (
  <div className='member'>
    <div className='member__avatar'>
      <img className='member__avatar-image' src={avatar} alt={username} />
    </div>
    <div className='member__description'>
      <div>{id}</div>
      <div>{username}</div>
      <div>{email}</div>
    </div>
  </div>
)

export default Member
