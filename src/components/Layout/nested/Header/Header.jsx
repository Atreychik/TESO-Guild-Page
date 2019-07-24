import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './Header.scss'

const Header = ({ show, onClick }) => (
  <header className='header'>
    <CSSTransition in={show} timeout={2000} classNames='header'>
      <div className='header__inner'>
        <figure className='header__logo'>
          <img className='header__logo-image' src='/images/logo2.png' alt='TESO Logo' />
        </figure>
        <h1 className='header__guild'>
          <span className='header__guild-string header__guild-string_lower'>Welcome to</span>
          <span className='header__guild-string'>Dark Machines</span>
          <span className='header__guild-string header__guild-string_lower'>Guild Page</span>
        </h1>
        <figure className='header__arrow' onClick={onClick}>
          <img className='header__arrow-image' src='/images/down-arrow.png' alt='Arrow down' />
        </figure>
      </div>
    </CSSTransition>
  </header>
)

export default Header
