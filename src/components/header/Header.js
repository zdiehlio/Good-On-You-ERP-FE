import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/good-on-you-logo.png'
import logoText from '../../assets/good-on-you-logo-text.png'
import './Header.css'
import { connect } from 'react-redux'
import { login, logout, clearSearch } from '../../actions'


class Header extends Component {

  render() {
    console.log('header props', sessionStorage.user)
    return (
      <div className="header">
        {!this.props.login.token || sessionStorage.user === '5' ? (
          <div className="header-container-login">
            <div className="logo-container">
              <img className="logo-img" src={logo} alt='logo' />
              <img className="logo-text" src={logoText} alt='logo text' />
            </div>
            {this.props.login.token ? (
              <div className="links-container-right">
                <div>{sessionStorage.userName} (Zalando)</div>
                <Link className='logout' onClick={this.props.logout} to="/login">Logout</Link>
              </div>) : ''}
          </div>
        ) : (
          <div className="header-container">
            <div className="logo-container">
              <img className="logo-img" src={logo} alt='logo' />
              <img className="logo-text" src={logoText} alt='logo text' />
            </div>


            <div className="links-container-left">
              <Link to="/searchBrand">Home</Link>
            </div>

            {this.props.login.token ? (
              <div className="links-container-left">
                <Link to="/searchBrand">Brand</Link>
              </div>) : (
              <div>''</div>
            )}

            {!this.props.login.token ? (
              <div className="links-container-left">
                <Link to="/login">Login</Link>
              </div>) : (
              <div className='links-container-left'>
                <Link onClick={this.props.logout} to="/login">Logout</Link>
              </div>
            )}
          </div>)}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    login: state.login,
    user: state.user,
  }
}

export default connect(mapStateToProps, {logout, clearSearch})(Header)
