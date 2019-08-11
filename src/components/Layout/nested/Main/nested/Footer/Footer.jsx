import React from 'react'
import './Footer.scss'

const Footer = () => (
  <footer className='footer'>
    <span className='footer__item'>Atreychik</span>
    <span className='footer__item'>
      &copy; Dark Machines 2019 {new Date().getFullYear() > 2019 ? `- ${new Date().getFullYear()}` : null}
    </span>
    <div className='footer__item'>
      <a href='https://github.com/Atreychik' className='footer__item-link' target='blank'>
        <img className='footer__item-image' src='/images/git.png' alt='Git page Link' />
      </a>
      <a href='https://www.linkedin.com/in/atreychik/' className='footer__item-link' target='blank'>
        <img className='footer__item-image' src='/images/linkedin.png' alt='LinkedIn page link' />
      </a>
      <a href='https://www.facebook.com/atreychik' className='footer__item-link' target='blank'>
        <img className='footer__item-image' src='/images/facebook.png' alt='Facebook page link' />
      </a>
    </div>
  </footer>
)

export default Footer
