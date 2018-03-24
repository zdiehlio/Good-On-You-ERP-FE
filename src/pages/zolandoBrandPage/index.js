import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { brandsHomePage } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import _ from 'lodash'

class ZolandoBrandPage extends Component {


  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }

    this.brandId=this.props.match.params.id
  }

  componentWillMount() {
    this.props.brandsHomePage(this.brandId)
    this.setState({isLoading: true})
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.zolando !== this.props.zolando) {
      this.setState({
        isLoading: false,
        results: nextProps.zolando,
      })
    }
  }

  render() {
    const state = this.state
    console.log('props', this.props.zolando)
    console.log('state', this.state)
    return (
      <div>
        <p>Zolando Brand Page</p>
      </div>
    )
  }
}






function mapStateToProps(state) {
  return {zolando: state.zolando}
}

export default connect(mapStateToProps, { brandsHomePage })( ZolandoBrandPage )
