import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Navigation } from './nested'
import './Main.scss'

const Main = ({ show, children }) => (
  <CSSTransition in={show} timeout={500} classNames='main'>
    <div className='main'>
      <Navigation />
      {children}
    </div>
  </CSSTransition>
)

export default Main
