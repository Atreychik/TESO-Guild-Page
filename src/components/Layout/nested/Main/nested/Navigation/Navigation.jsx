import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../../../../../../constants'
import './Navigation.scss'

const Navigation = ({ isAuthorized, logout }) => (
  <nav className='navigation'>
    <ul className='navigation__list'>
      {navigation.map(navItem => (
        <li className='navigation__item' key={navItem.label}>
          <NavLink
            className='navigation__link'
            activeClassName='navigation__link_active'
            exact={navItem.exact}
            to={navItem.path}>
            {navItem.label}
          </NavLink>
        </li>
      ))}
      <li className='navigation__item navigation__item_login'>
        {isAuthorized
          ? <span className='navigation__link' onClick={logout}>Log Out</span>
          : <a
            className='navigation__link navigation__link_discord'
            href='https://discordapp.com/api/oauth2/authorize?client_id=564098556399452160&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20email%20guilds.join'>
            <span>LogIn</span>
            <img
              className='navigation__link-image'
              src='/images/discord.png'
              alt='Discord Logo' />
          </a>}
      </li>
    </ul>
  </nav>
)

export default Navigation
