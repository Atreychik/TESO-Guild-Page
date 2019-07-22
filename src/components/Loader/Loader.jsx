import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './Loader.scss'

const Loader = ({ isLoading }) => (
  <CSSTransition in={isLoading} timeout={300} unmountOnExit classNames='loader'>
    <div className='loader' >
      <img src='/images/logo.png' alt='TESO Logo' className='loader__logo' />
    </div>
  </CSSTransition>
)

export default Loader
