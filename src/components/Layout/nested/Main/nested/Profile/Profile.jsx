import React from 'react'
import './Profile.scss'

const Profile = ({ user }) => (
  <div className='profile'>
    {user && <img src={user.avatar} alt='' />}
    {user && Object.keys(user).map(key => (
      <div key={key}>{key} - {user[key]}</div>
    ))
    }
  </div>
)

export default Profile
