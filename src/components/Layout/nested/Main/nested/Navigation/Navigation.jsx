import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigation, baseURL } from '../../../../../../constants'
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
            href={baseURL.authURI}>
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
