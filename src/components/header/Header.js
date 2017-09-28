import React, { Component } from 'react'
import logo from '../../assets/good-on-you-logo.png';
import logoText from '../../assets/good-on-you-logo-text.png';
import './Header.css';

class Header extends Component {

  render() {
    return <div className="header">
      <div className="header-container">
        <div className="logo-container">
          <img className="logo-img" src={logo} alt='logo' />
          <img className="logo-text" src={logoText} alt='logo text' />
        </div>

        <div className="links-container-left">
          <a href="/">Home</a>
        </div>

        <div className="links-container-left">
          <a href="/">Brand</a>
        </div>

        <div className="links-container-right">
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  }
}

export default Header
