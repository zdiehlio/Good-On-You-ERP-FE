import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'


class SuppDataCategory extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      finalAnswer: null,
      input: null,
      jeans: 'chip',
      tshirts: 'chip',
      shirts: 'chip',
      dresses: 'chip',
      handbags: 'chip',
      undergarments: 'chip',
      pantyhose: 'chip',
      swimwear: 'chip',
      kids: 'chip',
      shoes: 'chip',
      jewelry: 'chip'
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchAllCategory()
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.props.qa) {
      //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
      _.map(this.props.qa, cat => {
          this.setState({[cat.name]: 'chip'})
    })
      //if state of target 'name' does not yet exist, will pull value of answer off props and set state to that answer and also toggle editing
    }
    // else {
    //     this.setState({[event.target.name]: `${this.props.qa[event.target.name].id}`, currentAnswer: `${this.props.qa[event.target.name].id}`, isEditing: event.target.value})
    //     console.log('props answer');
    //   }
    //if an answer has not yet been created(first time visiting this specific question for this brand), will create a post request and toggle editing
    else {
      this.props.createSentence({brand: id, text: 'option 1'})
      this.props.createSentence({brand: id, text: 'option 2'})
      console.log('post');
    }
    this.setState({isEditing: '1'})
  }

  renderCategories() {
    _.map(this.props.qa, cat => {
        return(
          <button key={cat.id} className={cat.name} name={cat.name} onClick={this.handleChange}>
            {cat.name} {cat.name === 'chip-selected' ? 'x' : '+'}
          </button>
        )
      })
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    this.props.updateSentence(id, this.state.currentAnswer, {text: this.state.finalAnswer, is_selected: true})
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleChange(event){
    event.preventDefault()
    if(this.state[event.target.name] === 'chip-selected') {
      this.setState({[event.target.name]: 'chip'})
    } else {
      this.setState({[event.target.name]: 'chip-selected'})
    }
  }

//For development purposes for testing post requests, will delete record according to specific name of question and current brand
//If using, ensure to uncomment bind function in constructor above
//   handleDelete(event) {
//     event.preventDefault()
//     const { id }  = this.props.match.params
//     axios.delete(`http://34.212.110.48:3000/brand=${id}&question=${event.target.name}`)
// }

//render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <FormsHeader />
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
          <h5>What are the categories?</h5>
            <ul>
              {this.renderCategories()}
              <button className={this.state.jeans} name='jeans' onClick={this.handleChange}>
                Jeans {this.state.jeans === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.tshirts} name='tshirts' onClick={this.handleChange}>
                T-Shirts {this.state.tshirts === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.shirts} name='shirts' onClick={this.handleChange}>
                Shirts {this.state.shirts === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.dresses} name='dresses' onClick={this.handleChange}>
                Dresses {this.state.dresses === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.handbags} name='handbags' onClick={this.handleChange}>
                Handbags {this.state.handbags === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.undergarments} name='undergarments' onClick={this.handleChange}>
                Undergarments {this.state.undergarments === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.pantyhose} name='pantyhose' onClick={this.handleChange}>
                Pantyhose {this.state.pantyhose === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.swimwear} name='swimwear' onClick={this.handleChange}>
                Swimwear {this.state.swimwear === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.kids} name='kids' onClick={this.handleChange}>
                Kids {this.state.kids === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.shoes} name='shoes' onClick={this.handleChange}>
                Shoes {this.state.shoes === 'chip-selected' ? 'x' : '+'}
              </button>
              <button className={this.state.jewelry} name='jewelry' onClick={this.handleChange}>
                Jewelry {this.state.jewelry === 'chip-selected' ? 'x' : '+'}
              </button>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} name='1' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h5>What is the one sentence that describes the brand best?</h5>
            <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
          </div>
          )}
          {isEditing === '2' ? (
            <div className='editing'>
            <h5>What is the one sentence that describes the brand best?</h5>
            <p>Select one of the proposed sentences shown below.  If required, edit it and then choose save</p>
              <ul>
                <li><Field
                  type='radio'
                  onChange={this.handleRadio}
                  checked={this.state.currentAnswer==='6'}
                  name='New Zealands premium casual lifestyle brand for women and men'
                  component='input'
                  value='6'/> New Zealands premium casual lifestyle brand for women and men
                </li>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='2' value='2'>Save</button>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the one sentence that describes the brand best?</h5>
              <button name='2' onClick={this.handleEdit} value='2'>Edit</button>
            </div>
            )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'SuppDataCategoryForm'
})(
  connect(mapStateToProps, { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory })(SuppDataCategory)
)
