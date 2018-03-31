import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions'

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.login.token || !sessionStorage.jwt) {
        this.context.router.history.push('/login')
        this.props.logout()
      }
      // if(!this.props.login.token.user.group === 5) {
      //   this.context.router.history.push('/zalandoSearch')
      // }
    }

    componentWillUpdate(nextProps) {
      if(!this.props.login.token || !sessionStorage.jwt) {
        this.context.router.history.push('/login')
        this.props.logout()
      }
    }
    render() {
      console.log('auth', this.props.login)
      console.log('user', this.props.user)
      return <ComposedComponent {...this.props} />
    }
  }
  Authentication.contextTypes = {
    router: PropTypes.object,
  }

  function mapStateToProps(state) {
    return {
      login: state.login,
      user: state.user,
      state,
    }
  }
  return connect(mapStateToProps, { logout })(Authentication)
}
