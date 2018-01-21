import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Radio, Progress } from 'semantic-ui-react'
import { fetchStyles, createStyles } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'


class SuppDataPrice extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      price: null,
      progressBar: 0,
    }


    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchStyles(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.styles !== this.props.styles) {
      _.map(nextProps.styles, compare => {
        console.log(compare.style_qa.question)
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
    this.setState({isEditing: null, price: this.state.originalPrice})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.price) {
      this.props.createStyles({brand: id, style: 'price', score: this.state.price})
      this.setState({isEditing: null, originalPrice: this.state.price})
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
    this.setState({[name]: parseInt(value), error: false})
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
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataRetailers/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Price</h3></div>
            <div><Link to={`/suppDataGender/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === 'price' ? (
            <div className='editing'>
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
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='price'>Save</button></div>
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
