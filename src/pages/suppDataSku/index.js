import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Radio, Progress, Portal, Segment, Loader } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link'
import { fetchSku, updateSku } from '../../actions/sku'
import { SuppHeading } from '../../components'

class SuppDataSku extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: null,
      renderChangeError: false,
      progressBar: 0,
    }

    this.brandId = this.props.match.params.id

    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }

  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchSku(this.brandId)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sku !== this.props.sku) {
      if(nextProps.sku.sku) {
        this.setState({sku: nextProps.sku.sku})
        this.state.progressBar++
      }
      this.setState({isLoading: false})
    }
  }

  handleEdit(event) {
    event.preventDefault()
    this.setState({isEditing: event.target.name})
  }

  handleSave(event) {
    event.preventDefault()
    if(this.state.sku) {
      this.props.updateSku(this.brandId, {sku: this.state.sku})
      this.setState({changeError: false, renderChangeError: false, iginalSku: this.state.sku})
      event.target.value === 'next' ? this.props.history.push(`/suppDataStyles/${this.brandId}`) : this.setState({isEditing: null})
      this.state.progressBar++
    } else {
      this.setState({error: true})
    }
  }
  //

  handleCancel(event) {
    event.preventDefault()
    this.setState({isLoading: true,changeError: false, renderChangeError: false, isEditing: null})
    this.props.fetchSku(this.brandId)
  }

  handleChange(event, { value, name }){
    this.setState({changeError: true, currentEditing: '#sku', [name]: value, error: false})
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/suppDataCategory/${this.brandId}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataStyles/${this.brandId}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  render() {
    console.log('state', this.state)
    console.log('props', this.props)
    const state = this.state
    const props = this.props
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <SuppHeading id={this.brandId} brand={props.sku}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Number of SKUs</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        {state.renderChangeError === true ? (
          <Portal open={state.portal} className='portal'>
            <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
              <p>Please Save or Cancel your selected answers before proceeding</p>
              <HashLink to={state.currentEditing}><button onClick={this.handlePortal}>Go</button></HashLink>
            </Segment>
          </Portal>
        ) : ''}
        {state.isLoading === true ? <Loader active inline='centered' /> :
          <form className='brand-form'>
            {isEditing === 'sku' ? (
              <div className='editing' id='sku'>
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
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button onClick={this.handleSave} name='sku'>Save</button></div>
                  <div><button onClick={this.handleSave} name='sku' value='next'>Save & Next</button></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>What is the number of SKUs for the Brand? *</h4>
                {state.sku}
                <div className='button-container'>
                  <div></div>
                  <div><button name='sku' onClick={this.handleEdit}>Edit</button></div>
                </div>
              </div>
            )}
          </form>
        }
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
