import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateAnswer } from '../../actions'

class SuppDataImage extends Component {
  render() {
    return(
      <form>
        <div
      </form>
    )
  }
}

export default reduxForm({
  form: 'SuppDataImageForm'
})(
  connect(null, {updateAnswer})(SuppDataImage)
)
