import React, { Component } from 'react'
import logo from '../../assets/good-on-you-logo.png';
import logoText from '../../assets/good-on-you-logo-text.png';
import './Header.css';
import { connect } from 'react-redux';
import { login,logout } from '../../actions';

// { this.props.login ? <h3>{this.props.user.email}</h3> : <a href="/login">Login</a>}


class Header extends Component {

  onLogout = () => {
    this.props.logout()
  }
  render() {
    return (
      <div className="header">
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
            { this.props.email ? (
              <div className="dropdown">
                <h3 className="username">{this.props.email}</h3>
                <div className="dropdown-content">
                  <p onClick={this.onLogout}>logout</p>
                </div>
              </div>

            ) : <div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return state.login
}

export default connect(mapStateToProps, {logout})(Header)
