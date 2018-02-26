import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Radio, Progress, Portal, Segment } from 'semantic-ui-react'
import { fetchStyles, createStyles } from '../../actions/style'
import { SuppHeading } from '../../components'
import _ from 'lodash'


class SuppDataPrice extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      changeError: false,
      price: null,
      progressBar: 0,
    }


    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchStyles(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.styles !== this.props.styles) {
      _.map(nextProps.styles, compare => {
        if(compare.style_qa.question === 'price') {
          this.setState({price: compare.score, originalPrice: compare.score})
          this.state.progressBar++
        }
      })
    }
  }
  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.name})
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    this.setState({changeError: false, renderChangeError: false, isEditing: null, price: this.state.originalPrice})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.price) {
      this.props.createStyles({brand: id, style: 'price', score: this.state.price})
      this.setState({changeError: false, renderChangeError: false, originalPrice: this.state.price})
      event.target.value === 'next' ? this.props.history.push(`/suppDataRetailers/${id}`) : this.setState({isEditing: null})
      this.state.progressBar++
    } else {
      this.setState({error: true})
    }
  }

  renderPrice() {
    if(this.state.price === 1) {
      return('$')
    } else if(this.state.price ===2) {
      return('$$')
    } else if(this.state.price===3) {
      return('$$$')
    } else if(this.state.price===4) {
      return('$$$$')
    }
  }

  handleChange(event, { value, name }){
    this.setState({changeError: true, currentEditing: '#price', [name]: parseInt(value), error: false})
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    const { id }  = this.props.match.params
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/suppDataTypes/${id}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataRetailers/${id}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  render() {
    console.log('props', this.props.styles)
    console.log('state', this.state)
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.styles
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Price</h3></div>
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
        <form className='brand-form'>
          {isEditing === 'price' ? (
            <div className='editing' id='price'>
              <h4>What is the price guideline? *</h4>
              <Form.Field inline className={this.state.error === true ? 'ui error radio' : 'ui radio'}>
                <Radio
                  label='$'
                  onChange={this.handleChange}
                  checked={state.price === 1 ? true : false}
                  value='1'
                  name='price'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='$$'
                  onChange={this.handleChange}
                  checked={state.price === 2 ? true : false}
                  value='2'
                  name='price'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='$$$'
                  onChange={this.handleChange}
                  checked={state.price === 3 ? true : false}
                  name='price'
                  value='3'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='$$$$'
                  onChange={this.handleChange}
                  checked={state.price === 4  ? true : false}
                  name='price'
                  value='4'
                />
              </Form.Field>
              <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='price'>Save</button></div>
                <div><button onClick={this.handleSave} name='price' value='next'>Save & Next</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>What is the price guideline? *</h4>
              {this.renderPrice()}
              <div className='button-container'>
                <div></div>
                <div><button name='price' onClick={this.handleEdit}>Edit</button></div>
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
    styles: state.styles,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchStyles, createStyles })(SuppDataPrice)
