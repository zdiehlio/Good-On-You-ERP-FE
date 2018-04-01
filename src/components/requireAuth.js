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
    }

    componentWillUpdate(nextProps) {
      if(!this.props.login.token || !sessionStorage.jwt) {
        this.context.router.history.push('/login')
        this.props.logout()
      }
    }
    render() {
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
