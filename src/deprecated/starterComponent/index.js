import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import {  } from '../../actions'

class Comp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: null,
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleEdit(event){
    console.log(this.props.state);
  }
  handleSave(event){
    event.preventDefault();
  }

  handleChange(event){
    event.preventDefault();
  }

  render() {
    return(
      <form>

      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    state,
  }
}

export default connect(mapStateToProps, { })(Comp)
