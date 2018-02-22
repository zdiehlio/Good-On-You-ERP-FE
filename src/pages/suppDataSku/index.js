import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Radio, Progress } from 'semantic-ui-react'
import { fetchSku, updateSku } from '../../actions/sku'
import { SuppHeading } from '../../components'

class SuppDataSku extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: null,
      progressBar: 0,
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchSku(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sku !== this.props.sku) {
      console.log(nextProps)
      if(nextProps.sku.sku) {
        this.setState({originalSku: nextProps.sku.sku, sku: nextProps.sku.sku})
        this.state.progressBar++
      }
    }
  }

  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.name})
  }

  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.sku) {
      this.props.updateSku(id, {sku: this.state.sku})
      this.setState({originalSku: this.state.sku})
      event.target.value === 'next' ? this.props.history.push(`/suppDataStyles/${id}`) : this.setState({isEditing: null})
      this.state.progressBar++
    } else {
      this.setState({error: true})
    }
  }
  //

  handleCancel(event) {
    event.preventDefault()
    this.setState({isEditing: null, sku: this.state.originalSku})
  }

  handleChange(event, { value, name }){
    this.setState({[name]: value, error: false})
  }

  render() {
    console.log('props', this.props.sku)
    console.log('state', this.state.sku)
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={props.sku}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataCategory/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Number of SKUs</h3></div>
            <div><Link to={`/suppDataStyles/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === 'sku' ? (
            <div className='editing'>
              <h4>What is the number of SKUs for the Brand? *</h4>
              <Form.Field inline className={this.state.error === true ? 'ui error radio' : 'ui radio'}>
                <Radio
                  label='Less than 50'
                  onChange={this.handleChange}
                  checked={state.sku === '<50' ? true : false}
                  value='<50'
                  name='sku'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='Between 50 and 100'
                  onChange={this.handleChange}
                  checked={state.sku === '50-100' ? true : false}
                  value='50-100'
                  name='sku'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='Between 100 and 200'
                  onChange={this.handleChange}
                  checked={state.sku === '100-200' ? true : false}
                  name='sku'
                  value='100-200'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='Between 200 and 300'
                  onChange={this.handleChange}
                  checked={state.sku === '200-300'  ? true : false}
                  name='sku'
                  value='200-300'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='Between 300 and 400'
                  onChange={this.handleChange}
                  checked={state.sku === '300-400'  ? true : false}
                  name='sku'
                  value='300-400'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='Between 400 and 500'
                  onChange={this.handleChange}
                  checked={state.sku === '400-500'  ? true : false}
                  name='sku'
                  value='400-500'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='More than 500'
                  onChange={this.handleChange}
                  checked={state.sku === '>500'  ? true : false}
                  name='sku'
                  value='>500'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='Unspecified'
                  onChange={this.handleChange}
                  checked={state.sku === 'unspecified'  ? true : false}
                  name='sku'
                  value='unspecified'
                />
              </Form.Field>
              <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='sku'>Save</button></div>
                <div><button onClick={this.handleSave} name='sku' value='next'>Save & Next</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>What is the number of SKUs for the Brand? *</h4>
              {state.originalSku}
              <div className='button-container'>
                <div></div>
                <div><button name='sku' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sku: state.sku,
  }
}

export default connect(mapStateToProps, { fetchSku, updateSku })(SuppDataSku)
