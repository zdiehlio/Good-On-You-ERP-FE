import React, { Component } from 'react'
import logo from '../../assets/good-on-you-logo.png'
import logoText from '../../assets/good-on-you-logo-text.png'
import './Header.css'
import { connect } from 'react-redux'
import { login, logout, clearSearch } from '../../actions'


class Header extends Component {

  onLogout(event) {
    this.props.logout()
  }
  render() {
    console.log('header', this.props)
    return (
      <div className="header">
        <div className="header-container">
          <div className="logo-container">
            <img className="logo-img" src={logo} alt='logo' />
            <img className="logo-text" src={logoText} alt='logo text' />
          </div>


          <div className="links-container-left">
            <a href="/searchBrand">Home</a>
          </div>)

          {sessionStorage.jwt ? (
            <div className="links-container-left">
              <a href="/searchBrand">Brand</a>
            </div>) : (
            <div>''</div>
          )}

          {!sessionStorage.jwt ? (
            <div className="links-container-left">
              <a href="/login">Login</a>
            </div>) : (
            <div className='links-container-left'>
              <a onClick={this.onLogout} href="/login">Logout</a>
            </div>
          )}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return state.login
}

export default connect(mapStateToProps, {logout, clearSearch})(Header)
