import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions'

export default function(ComposedComponent) {
  class ZalandoAuth extends Component {

    componentWillMount() {
      if(!this.props.login.token || !sessionStorage.jwt) {
        this.context.router.history.push('/login')
        this.props.logout()
      } else if(sessionStorage.user !== '5') {
        this.context.router.history.push('/searchBrand')
      }
    }

    componentWillUpdate(nextProps) {
      if(!this.props.login.token || !sessionStorage.jwt) {
        this.context.router.history.push('/login')
        this.props.logout()
      } else if(sessionStorage.user !== '5') {
        this.context.router.history.push('/searchBrand')
      }
    }
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  ZalandoAuth.contextTypes = {
    router: PropTypes.object,
  }

  function mapStateToProps(state) {
    return {
      login: state.login,
      user: state.user,
      zolando: state.zolando,
      state,
    }
  }
  return connect(mapStateToProps, { logout })(ZalandoAuth)
}
