import React from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  Footer,
  Navigation,
  Profile
} from './nested'
import './Main.scss'

const Main = ({ show, children }) => (
  <CSSTransition in={show} timeout={500} classNames='main'>
    <div className='main'>
      <Navigation />
      <div className='main__container'>
        <main className='main__content'>
          {children}
        </main>
        <Profile />
      </div>
      <Footer />
    </div>
  </CSSTransition>
)

export default Main
