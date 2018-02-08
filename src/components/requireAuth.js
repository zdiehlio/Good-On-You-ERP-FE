import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions'

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.token || !sessionStorage.jwt) {
        this.context.router.history.push('/login')
        this.props.logout()
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.token || !sessionStorage.jwt) {
        this.context.router.history.push('/login')
        this.props.logout()
      }
    }
    render() {
      console.log('token', this.props)
      return <ComposedComponent {...this.props} />
    }
  }
  Authentication.contextTypes = {
    router: PropTypes.object,
  }

  function mapStateToProps(state) {
    return {
      token: state.login.token,
      state,
    }
  }
  return connect(mapStateToProps, { logout })(Authentication)
}
