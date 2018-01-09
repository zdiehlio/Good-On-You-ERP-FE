import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.token) {
        this.props.history.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.token) {
        this.context.router.push('/login')
      }
    }
    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {token: state.login.token}
  }
  return connect(mapStateToProps)(Authentication)
}
