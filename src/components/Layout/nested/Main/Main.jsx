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
      <div className='main__inner'>
        <Navigation />
        <div className='main__container'>
          <div className='main__container-inner'>
            <main className='main__content'>
              {children}
            </main>
          </div>
          <Profile />
        </div>
        <Footer />
      </div>
    </div>
  </CSSTransition>
)

export default Main
