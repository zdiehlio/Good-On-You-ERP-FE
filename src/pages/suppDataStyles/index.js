import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllStyles, fetchStyles, createStyles, updateStyles } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import { ProgressBar, Line } from 'react-progressbar.js'

import './suppDataStyles.css'
const ROOT_URL = 'https://goy-ed-2079.nodechef.com'

class SuppDataStyles extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      progress: []
    }


    this.handleKids = this.handleKids.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleKidsEdit = this.handleKidsEdit.bind(this)
    this.handlePercentage = this.handlePercentage.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchAllStyles()
  this.props.fetchStyles(id)
}

componentWillReceiveProps(nextProps) {
  if(nextProps.qa !== this.props.qa) {
    _.map(nextProps.qa, compare => {
      this.setState({[compare.style_qa.tag]: compare.score})
    })
  }
}

handleKidsEdit(event) {
  event.preventDefault()
  const { id }  = this.props.match.params
  if(!this.state.kids) {
    _.map(this.props.qa, check => {
      if(check.style_qa.question === event.target.name) {
        console.log('kids', check.style_qa.tag);
        this.setState({kids: check.style_qa.tag})
      }
    })
  }
  this.setState({isEditing: event.target.name})
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.map(this.props.qa, check => {
      if(check.style_qa.question === event.target.name  && !this.state[check.style_qa.tag]) {
        this.setState({[check.style_qa.tag]: check.score})
      } else if(!this.state[check.style_qa.tag]){
        console.log(check.style_qa);
        this.setState({[check.style_qa.tag]: 0})
      }
    })
    _.map(this.props.pre_qa, check => {
      if(!this.state[check.tag])
        this.setState({[check.tag]: 0})
    })
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
    _.map(this.state.progress, check => {
      this.props.createStyles({brand: id, style: check, score: this.state[check]})
    })
    if(this.state.kids && event.target.name === 'kids') {
      this.props.createStyles({brand: id, style: this.state.kids})
    }
    this.setState({isEditing: null})
  }

  handleKids(event){
    this.setState({kids: event.target.name})
  }

  handlePercentage(event) {
    event.preventDefault()
    if(!this.state[event.target.name]) {
      this.setState({[event.target.name]: 0})
    }
    if(event.target.value === 'add' && this.state[event.target.name] < 1) {
      this.setState({[event.target.name]: this.state[event.target.name] + 0.25})
    }
    if(event.target.value === 'subtract' && this.state[event.target.name] > 0) {
      this.setState({[event.target.name]: this.state[event.target.name] - 0.25})
    }
    if(this.state.progress.includes(event.target.name)) {
      return
    } else {
        this.setState({progress: [...this.state.progress, event.target.name]})
      }
  }

  renderStyles(el) {
    const state = this.state
    let options = {
      strokeWidth: 2,
      color: '#17CABE',
      text: {
        style: {
          position: 'center',
          margin:'0.2em',
        }
      }
    }
    return(
      <div>
        <button onClick={this.handlePercentage} name={el} value='subtract' className='progress'>-</button>
        <Line
        progress={state[el]}
        text={state[el] ? `${(state[el] * 100)}%` : '0%'}
        options={options}
        containerClassName={'progress-container'}/>
        <button onClick={this.handlePercentage} name={el} value='add' className='progress'>+</button>
      </div>
    )
  }

//render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props qa', this.props.qa);
    console.log('props pre_qa', this.props.pre_qa);
    console.log('state', this.state);
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    return(
      <div className='form-container'>
        <FormsHeader />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataCategory/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Styles</h3></div>
            <div><Link to={`/suppDataTypes/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <form className='brand-form'>
        {isEditing === 'kids' ? (
          <div className='editing'>
            <h4>Does the Brand sell Clothes for kids?</h4>
              <ul>
                <li><Field
                  type='radio'
                  onChange={this.handleKids}
                  checked={state.kids === 'kids'}
                  name='kids'
                  component='input'/> Yes
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleKids}
                  checked={state.kids === 'no-kids'}
                  name='no-kids'
                  component='input'/> No
                </li>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='kids'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell Clothes for kids?</h4>
            <h5>{state['1']}</h5>
            <button name='kids' onClick={this.handleKidsEdit}>Edit</button>
          </div>
          )}


        {isEditing === 'men' ? (
          <div className='editing'>
          <h4>Does the Brand sell clothes for men?</h4>
            <div>
              <h5>Mens Surf</h5>
              {this.renderStyles('men-surf')}
              <h5>Menswear</h5>
              {this.renderStyles('men-menswear')}
              <h5>Mens Casual</h5>
              {this.renderStyles('men-casual')}
              <h5>Mens Work</h5>
              {this.renderStyles('men-work')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='men' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell clothes for men?</h4>
            <h5>Mens Surf: {state['men-surf'] ? `${(state['men-surf'] * 100)}%` : '0%'}</h5>
            <h5>Mens Wear: {state['men-menswear'] ? `${(state['men-menswear'] * 100)}%` : '0%'}</h5>
            <h5>Mens Casual: {state['men-casual'] ? `${(state['men-casual'] * 100)}%` : '0%'}</h5>
            <h5>Mens Work: {state['men-work'] ? `${(state['men-work'] * 100)}%` : '0%'}</h5>
            <button name='men' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'older-women' ? (
          <div className='editing'>
          <h4>Does the Brand sell clothes for older-women?</h4>
            <div>
              <h5>Older Women High Range</h5>
                {this.renderStyles('women-old-high')}
              <h5>Older Women Mid Range</h5>
                {this.renderStyles('women-old-mid')}
              <h5>Older Women Low Range</h5>
                {this.renderStyles('women-old-low')}
              <h5>Older Women Plus</h5>
                {this.renderStyles('women-old-plus')}
              <h5>Older Women Classic</h5>
                {this.renderStyles('women-old-classic')}
              <h5>Older Women Comfort</h5>
                {this.renderStyles('women-old-comfort')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='older-women' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell clothes for older-women?</h4>
            <h5>Older Women High Range: {state['women-old-high'] ? `${(state['women-old-high'] * 100)}%` : '0%'}</h5>
            <h5>Older Women Mid Range: {state['women-old-mid'] ? `${(state['women-old-mid'] * 100)}%` : '0%'}</h5>
            <h5>Older Women Low Range: {state['women-old-low'] ? `${(state['women-old-low'] * 100)}%` : '0%'}</h5>
            <h5>Older Women Plus: {state['women-old-plus'] ? `${(state['women-old-plus'] * 100)}%` : '0%'}</h5>
            <h5>Older Women Classic: {state['women-old-classic'] ? `${(state['women-old-classic'] * 100)}%` : '0%'}</h5>
            <h5>Older Women Comfort: {state['women-old-comfort'] ? `${(state['women-old-comfort'] * 100)}%` : '0%'}</h5>
            <button name='older-women' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'young-women' ? (
          <div className='editing'>
          <h4>Does the Brand sell clothes for young women?</h4>
            <div>
              <h5>Young Women Low End</h5>
                {this.renderStyles('women-young-low')}
              <h5>Older Women Mid Range</h5>
                {this.renderStyles('women-young-minimal')}
              <h5>Young Women Boho</h5>
                {this.renderStyles('women-young-boho')}
              <h5>Young Women Preppy</h5>
                {this.renderStyles('women-young-preppy')}
              <h5>Young Women Streetwear</h5>
                {this.renderStyles('women-young-streetwear')}
              <h5>Young Women Smart Casual</h5>
                {this.renderStyles('women-young-smart')}
              <h5>Young Women Mall Designer</h5>
                {this.renderStyles('women-young-mall')}
              <h5>Young Women Evening</h5>
                {this.renderStyles('women-young-evening')}
              <h5>Young Women Vintage Look</h5>
                {this.renderStyles('women-young-vintage')}
              <h5>Young Women Wedding/Formal</h5>
                {this.renderStyles('women-young-formal')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='young-women' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell clothes for young-women?</h4>
            <h5>Young Women Low End: {state['women-young-low'] ? `${(state['women-young-low'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Minimal: {state['women-young-minimal'] ? `${(state['women-young-minimal'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Boho: {state['women-young-boho'] ? `${(state['women-young-boho'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Preppy: {state['women-young-preppy'] ? `${(state['women-young-preppy'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Streetwear: {state['women-young-streetwear'] ? `${(state['women-young-streetwear'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Smart Casual: {state['women-young-smart'] ? `${(state['women-young-smart'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Mall Designer: {state['women-young-mall'] ? `${(state['women-young-mall'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Evening: {state['women-young-evening'] ? `${(state['women-young-evening'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Vintage Look: {state['women-young-vintage'] ? `${(state['women-young-vintage'] * 100)}%` : '0%'}</h5>
            <h5>Young Women Wedding/Formal: {state['women-young-formal'] ? `${(state['women-young-formal'] * 100)}%` : '0%'}</h5>
            <button name='young-women' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'designer' ? (
          <div className='editing'>
          <h4>Where is the brand designed?</h4>
            <div>
              <h5>US Designers</h5>
              {this.renderStyles('us-designed')}
              <h5>Canadian Designers</h5>
              {this.renderStyles('ca-designed')}
              <h5>AU Designers</h5>
              {this.renderStyles('au-designed')}
              <h5>NZ Designers</h5>
              {this.renderStyles('nz-designed')}
              <h5>EU Designers</h5>
              {this.renderStyles('eu-designed')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='designer' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Where is the brand designed?</h4>
            <h5>US Designers: {state['us-designed'] ? `${(state['us-designed'] * 100)}%` : '0%'}</h5>
            <h5>Canadian Designers: {state['ca-designed'] ? `${(state['ca-designed'] * 100)}%` : '0%'}</h5>
            <h5>AU Designers: {state['au-designed'] ? `${(state['au-designed'] * 100)}%` : '0%'}</h5>
            <h5>NZ Designers: {state['nz-designed'] ? `${(state['nz-designed'] * 100)}%` : '0%'}</h5>
            <h5>EU Designers: {state['eu-designed'] ? `${(state['eu-designed'] * 100)}%` : '0%'}</h5>
            <button name='designer' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'basics' ? (
          <div className='editing'>
          <h4>Does the brand sell Basics?</h4>
            <div>
              <h5>Denim</h5>
              {this.renderStyles('basics-denim')}
              <h5>Tees</h5>
              {this.renderStyles('basics-tees')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='basics' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell basics?</h4>
            <h5>Denim: {state['basics-denim'] ? `${(state['basics-denim'] * 100)}%` : '0%'}</h5>
            <h5>Tees: {state['basics-tees'] ? `${(state['basics-tees'] * 100)}%` : '0%'}</h5>
            <button name='basics' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'luxury' ? (
          <div className='editing'>
          <h4>Does the brand sell Luxury clothes?</h4>
            <div>
              <h5>Luxury - but showy</h5>
              {this.renderStyles('luxury-showy')}
              <h5>Luxury - but cool</h5>
              {this.renderStyles('luxury-cool')}
              <h5>High Luxury</h5>
              {this.renderStyles('luxury-high')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='luxury' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell Luxury clothes?</h4>
            <h5>Luxury - but showy: {state['luxury-showy'] ? `${(state['luxury-showy'] * 100)}%` : '0%'}</h5>
            <h5>Luxury - but cool: {state['luxury-cool'] ? `${(state['luxury-cool'] * 100)}%` : '0%'}</h5>
            <h5>High Luxury: {state['luxury-high'] ? `${(state['luxury-high'] * 100)}%` : '0%'}</h5>
            <button name='luxury' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'accessories' ? (
          <div className='editing'>
          <h4>Does the brand sell accessories?</h4>
            <div>
              <h5>Accessories</h5>
              {this.renderStyles('accessories')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='accessories' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell accessories?</h4>
            <h5>Accessories: {state['accessories'] ? `${(state['accessories'] * 100)}%` : '0%'}</h5>
            <button name='accessories' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'bags' ? (
          <div className='editing'>
          <h4>Does the brand sell bags?</h4>
            <div>
              <h5>Low end Handbags</h5>
              {this.renderStyles('bags-low')}
              <h5>High end Handbags</h5>
              {this.renderStyles('bags-high')}
              <h5>Other Bags</h5>
              {this.renderStyles('bags-other')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='bags' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell bags?</h4>
            <h5>Low end Handbags: {state['bags-low'] ? `${(state['bags-low'] * 100)}%` : '0%'}</h5>
            <h5>High end Handbags: {state['bags-high'] ? `${(state['bags-high'] * 100)}%` : '0%'}</h5>
            <h5>Other Bags: {state['bags-other'] ? `${(state['bags-other'] * 100)}%` : '0%'}</h5>
            <button name='bags' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'fitness' ? (
          <div className='editing'>
          <h4>Does the brand sell Fitness clothing?</h4>
            <div>
              <h5>Swimwear Low-End</h5>
              {this.renderStyles('swimwear-low')}
              <h5>Swimwear Mid-Range</h5>
              {this.renderStyles('swimwear-mid')}
              <h5>Activewear</h5>
              {this.renderStyles('activewear')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='fitness' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell Fitness clothing?</h4>
            <h5>Swimwear Low-End: {state['swimwear-low'] ? `${(state['swimwear-low'] * 100)}%` : '0%'}</h5>
            <h5>Swimwear Mid-Range: {state['swimwear-mid'] ? `${(state['swimwear-mid'] * 100)}%` : '0%'}</h5>
            <h5>Activewear: {state['activewear'] ? `${(state['activewear'] * 100)}%` : '0%'}</h5>
            <button name='fitness' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'outdoor' ? (
          <div className='editing'>
          <h4>Does the brand sell Outdoor Gear?</h4>
            <div>
              <h5>Outdoor Gear</h5>
              {this.renderStyles('outdoor-')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='outdoor' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell Outdoor Gear?</h4>
            <h5>Outdoor Gear: {state['outdoor-'] ? `${(state['outdoor-'] * 100)}%` : '0%'}</h5>
            <button name='outdoor' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'shoes' ? (
          <div className='editing'>
          <h4>Does the Brand sell shoes?</h4>
            <div>
              <h5>Everyday Shoes</h5>
              {this.renderStyles('shoes-everyday')}
              <h5>Low-End Shoes</h5>
              {this.renderStyles('shoes-low')}
              <h5>Dressy Shoes</h5>
              {this.renderStyles('shoes-dressy')}
              <h5>Sport Shoes</h5>
              {this.renderStyles('shoes-sport')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='shoes' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell shoes?</h4>
            <h5>Everyday Shoes: {state['shoes-everyday'] ? `${(state['shoes-everyday'] * 100)}%` : '0%'}</h5>
            <h5>Low-End Shoes: {state['shoes-low'] ? `${(state['shoes-low'] * 100)}%` : '0%'}</h5>
            <h5>Dressy Shoes: {state['shoes-dressy'] ? `${(state['shoes-dressy'] * 100)}%` : '0%'}</h5>
            <h5>Sport Shoes: {state['shoes-sport'] ? `${(state['shoes-sport'] * 100)}%` : '0%'}</h5>
            <button name='shoes' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'underwear' ? (
          <div className='editing'>
          <h4>Does the Brand sell underwear?</h4>
            <div>
              <h5>Mid range Lingerie</h5>
              {this.renderStyles('underwear-mid')}
              <h5>High End Lingerie</h5>
              {this.renderStyles('underwear-high')}
              <h5>Basic Underwear/Socks</h5>
              {this.renderStyles('underwear-basic')}
              <h5>Low End Bras/Hoisery</h5>
              {this.renderStyles('underwear-low')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='underwear' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell underwear?</h4>
            <h5>Mid range Lingerie: {state['underwear-mid'] ? `${(state['underwear-mid'] * 100)}%` : '0%'}</h5>
            <h5>High End Lingerie: {state['underwear-high'] ? `${(state['underwear-high'] * 100)}%` : '0%'}</h5>
            <h5>Basic Underwear/Socks: {state['underwear-basic'] ? `${(state['underwear-basic'] * 100)}%` : '0%'}</h5>
            <h5>Low End Bras/Hoisery: {state['underwear-low'] ? `${(state['underwear-low'] * 100)}%` : '0%'}</h5>
            <button name='underwear' onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing === 'style-scores' ? (
          <div className='editing'>
          <h4>Style Scores</h4>
            <div>
              <h5>Casual</h5>
              {this.renderStyles('casual')}
              <h5>Classic</h5>
              {this.renderStyles('classic')}
              <h5>Feminine</h5>
              {this.renderStyles('feminine')}
              <h5>Sporty</h5>
              {this.renderStyles('sporty')}
              <h5>Trendy</h5>
              {this.renderStyles('trendy')}
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='style-scores' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Style Scores</h4>
            <h5>Casual: {state['casual'] ? `${(state['casual'] * 100)}%` : '0%'}</h5>
            <h5>Classic: {state['classic'] ? `${(state['classic'] * 100)}%` : '0%'}</h5>
            <h5>Feminine: {state['feminine'] ? `${(state['feminine'] * 100)}%` : '0%'}</h5>
            <h5>Sporty: {state['sporty'] ? `${(state['sporty'] * 100)}%` : '0%'}</h5>
            <h5>Trendy: {state['trendy'] ? `${(state['trendy'] * 100)}%` : '0%'}</h5>
            <button name='style-scores' onClick={this.handleEdit}>Edit</button>
          </div>
        )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    qa: state.qa,
    pre_qa: state.preQa
  }
}

export default reduxForm({
  form: 'SuppDataStylesForm'
})(
  connect(mapStateToProps, { fetchAllStyles, fetchStyles, updateStyles, createStyles })(SuppDataStyles)
)
