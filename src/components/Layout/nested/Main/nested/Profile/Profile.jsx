import React from 'react'
import './Profile.scss'

const Profile = ({ user }) => (
  <div className='profile'>
    <div className='profile__inner'>
      {user && <img className='profile__image' src={user.avatar || `https://loremflickr.com/320/240/dog?random=${user.id}`} alt='' />}
      {user && Object.keys(user).map(key => (
        <div className='profile__info' key={key}>{key} - {user[key]}</div>
      ))
      }
    </div>
  </div>
)

export default Profile
