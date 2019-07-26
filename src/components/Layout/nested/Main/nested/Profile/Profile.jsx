import React from 'react'
import './Profile.scss'

const Profile = ({ user }) => (
  <div className='profile'>
    {user && <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=256`} alt='' />}
    {user && Object.keys(user).map(key => (
      <div key={key}>{key} - {user[key]}</div>
    ))
    }
  </div>
)

export default Profile
