import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStyles, createStyles } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'


class SuppDataPrice extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      price: null
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
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, compare => {
        if(compare.style_qa.question === 'price') {
          this.setState({price: compare.score})
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
    this.setState({isEditing: null})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createStyles({brand: id, style: 'price', score: this.state.price})
    this.setState({isEditing: null})
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.qa
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <FormsHeader />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataRetailers/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Price</h3></div>
            <div><Link to={`/suppDataGender/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <form className='brand-form'>
        {isEditing === 'price' ? (
          <div className='editing'>
            <h4>What is the price guideline?</h4>
              <ul>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={state.price === '1' || state.price === 1}
                  value='1'
                  name='price'
                  component='input'/> $
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={state.price === '2' || state.price === 2}
                  value='2'
                  name='price'
                  component='input'/> $$
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={state.price === '3' || state.price === 3}
                  name='price'
                  value='3'
                  component='input'/> $$$
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={state.price === '4' || state.price === 4}
                  name='price'
                  value='4'
                  component='input'/> $$$$
                </li>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='price'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What is the price guideline?</h4>
            <h5></h5>
            <button name='price' onClick={this.handleEdit}>Edit</button>
          </div>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    qa: state.qa
  }
}

export default reduxForm({
  form: 'SuppDataPriceForm'
})(
  connect(mapStateToProps, { fetchStyles, createStyles })(SuppDataPrice)
)
