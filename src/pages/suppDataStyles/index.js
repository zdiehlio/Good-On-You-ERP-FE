import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Radio, Input} from 'semantic-ui-react'
import { fetchAllStyles, fetchStyles, createStyles, updateStyles } from '../../actions'
import { SuppHeading } from '../../components'
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
      progress: [],
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
        if(compare.style_qa.question === 'kids') {
          this.setState({kids: compare.style_qa.tag})
        }
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
    _.map(this.props.pre_qa, check => {
      if(!this.state[check.tag])
        this.setState({[check.tag]: 0})
    })
    this.setState({isEditing: event.target.name})
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.default()
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

  handleKids(event, {name}){
    this.setState({kids: name})
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
        },
      },
    }
    return(
      <div className='percentage-container'>
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
    console.log('props qa', this.props.qa)
    console.log('props pre_qa', this.props.pre_qa)
    console.log('state', this.state)
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    return(
      <div className='form-container'>
        <SuppHeading id={this.props.match.params.id} />
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
              <Form.Field inline>
                <Radio
                  label='Yes'
                  onChange={this.handleKids}
                  checked={state.kids === 'kids' ? true : false}
                  name='kids'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='No'
                  onChange={this.handleKids}
                  checked={state.kids === 'no-kids' ? true : false}
                  name='no-kids'
                />
              </Form.Field>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='kids'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell Clothes for kids?</h4>
              <p>{state.kids === 'no-kids' ? 'No' : 'Yes'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='kids' onClick={this.handleKidsEdit}>Edit</button></div>
              </div>
            </div>
          )}


          {isEditing === 'men' ? (
            <div className='editing'>
              <h4>Does the Brand sell clothes for men?</h4>
              <div>
                <p>Mens Surf</p>
                {this.renderStyles('men-surf')}
                <p>Menswear</p>
                {this.renderStyles('men-menswear')}
                <p>Mens Casual</p>
                {this.renderStyles('men-casual')}
                <p>Mens Work</p>
                {this.renderStyles('men-work')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='men' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for men?</h4>
              <p>Mens Surf: {state['men-surf'] ? `${(state['men-surf'] * 100)}%` : '0%'}</p>
              <p>Mens Wear: {state['men-menswear'] ? `${(state['men-menswear'] * 100)}%` : '0%'}</p>
              <p>Mens Casual: {state['men-casual'] ? `${(state['men-casual'] * 100)}%` : '0%'}</p>
              <p>Mens Work: {state['men-work'] ? `${(state['men-work'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='men' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'older-women' ? (
            <div className='editing'>
              <h4>Does the Brand sell clothes for older-women?</h4>
              <div>
                <p>Older Women High Range</p>
                {this.renderStyles('women-old-high')}
                <p>Older Women Mid Range</p>
                {this.renderStyles('women-old-mid')}
                <p>Older Women Low Range</p>
                {this.renderStyles('women-old-low')}
                <p>Older Women Plus</p>
                {this.renderStyles('women-old-plus')}
                <p>Older Women Classic</p>
                {this.renderStyles('women-old-classic')}
                <p>Older Women Comfort</p>
                {this.renderStyles('women-old-comfort')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='older-women' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for older-women?</h4>
              <p>Older Women High Range: {state['women-old-high'] ? `${(state['women-old-high'] * 100)}%` : '0%'}</p>
              <p>Older Women Mid Range: {state['women-old-mid'] ? `${(state['women-old-mid'] * 100)}%` : '0%'}</p>
              <p>Older Women Low Range: {state['women-old-low'] ? `${(state['women-old-low'] * 100)}%` : '0%'}</p>
              <p>Older Women Plus: {state['women-old-plus'] ? `${(state['women-old-plus'] * 100)}%` : '0%'}</p>
              <p>Older Women Classic: {state['women-old-classic'] ? `${(state['women-old-classic'] * 100)}%` : '0%'}</p>
              <p>Older Women Comfort: {state['women-old-comfort'] ? `${(state['women-old-comfort'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='older-women' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'young-women' ? (
            <div className='editing'>
              <h4>Does the Brand sell clothes for young women?</h4>
              <div>
                <p>Young Women Low End</p>
                {this.renderStyles('women-young-low')}
                <p>Older Women Mid Range</p>
                {this.renderStyles('women-young-minimal')}
                <p>Young Women Boho</p>
                {this.renderStyles('women-young-boho')}
                <p>Young Women Preppy</p>
                {this.renderStyles('women-young-preppy')}
                <p>Young Women Streetwear</p>
                {this.renderStyles('women-young-streetwear')}
                <p>Young Women Smart Casual</p>
                {this.renderStyles('women-young-smart')}
                <p>Young Women Mall Designer</p>
                {this.renderStyles('women-young-mall')}
                <p>Young Women Evening</p>
                {this.renderStyles('women-young-evening')}
                <p>Young Women Vintage Look</p>
                {this.renderStyles('women-young-vintage')}
                <p>Young Women Wedding/Formal</p>
                {this.renderStyles('women-young-formal')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='young-women' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for young-women?</h4>
              <p>Young Women Low End: {state['women-young-low'] ? `${(state['women-young-low'] * 100)}%` : '0%'}</p>
              <p>Young Women Minimal: {state['women-young-minimal'] ? `${(state['women-young-minimal'] * 100)}%` : '0%'}</p>
              <p>Young Women Boho: {state['women-young-boho'] ? `${(state['women-young-boho'] * 100)}%` : '0%'}</p>
              <p>Young Women Preppy: {state['women-young-preppy'] ? `${(state['women-young-preppy'] * 100)}%` : '0%'}</p>
              <p>Young Women Streetwear: {state['women-young-streetwear'] ? `${(state['women-young-streetwear'] * 100)}%` : '0%'}</p>
              <p>Young Women Smart Casual: {state['women-young-smart'] ? `${(state['women-young-smart'] * 100)}%` : '0%'}</p>
              <p>Young Women Mall Designer: {state['women-young-mall'] ? `${(state['women-young-mall'] * 100)}%` : '0%'}</p>
              <p>Young Women Evening: {state['women-young-evening'] ? `${(state['women-young-evening'] * 100)}%` : '0%'}</p>
              <p>Young Women Vintage Look: {state['women-young-vintage'] ? `${(state['women-young-vintage'] * 100)}%` : '0%'}</p>
              <p>Young Women Wedding/Formal: {state['women-young-formal'] ? `${(state['women-young-formal'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='young-women' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'designer' ? (
            <div className='editing'>
              <h4>Where is the brand designed?</h4>
              <div>
                <p>US Designers</p>
                {this.renderStyles('us-designed')}
                <p>Canadian Designers</p>
                {this.renderStyles('ca-designed')}
                <p>AU Designers</p>
                {this.renderStyles('au-designed')}
                <p>NZ Designers</p>
                {this.renderStyles('nz-designed')}
                <p>EU Designers</p>
                {this.renderStyles('eu-designed')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='designer' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Where is the brand designed?</h4>
              <p>US Designers: {state['us-designed'] ? `${(state['us-designed'] * 100)}%` : '0%'}</p>
              <p>Canadian Designers: {state['ca-designed'] ? `${(state['ca-designed'] * 100)}%` : '0%'}</p>
              <p>AU Designers: {state['au-designed'] ? `${(state['au-designed'] * 100)}%` : '0%'}</p>
              <p>NZ Designers: {state['nz-designed'] ? `${(state['nz-designed'] * 100)}%` : '0%'}</p>
              <p>EU Designers: {state['eu-designed'] ? `${(state['eu-designed'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='designer' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'basics' ? (
            <div className='editing'>
              <h4>Does the brand sell Basics?</h4>
              <div>
                <p>Denim</p>
                {this.renderStyles('basics-denim')}
                <p>Tees</p>
                {this.renderStyles('basics-tees')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='basics' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell basics?</h4>
              <p>Denim: {state['basics-denim'] ? `${(state['basics-denim'] * 100)}%` : '0%'}</p>
              <p>Tees: {state['basics-tees'] ? `${(state['basics-tees'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='basics' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'luxury' ? (
            <div className='editing'>
              <h4>Does the brand sell Luxury clothes?</h4>
              <div>
                <p>Luxury - but showy</p>
                {this.renderStyles('luxury-showy')}
                <p>Luxury - but cool</p>
                {this.renderStyles('luxury-cool')}
                <p>High Luxury</p>
                {this.renderStyles('luxury-high')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='luxury' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Luxury clothes?</h4>
              <p>Luxury - but showy: {state['luxury-showy'] ? `${(state['luxury-showy'] * 100)}%` : '0%'}</p>
              <p>Luxury - but cool: {state['luxury-cool'] ? `${(state['luxury-cool'] * 100)}%` : '0%'}</p>
              <p>High Luxury: {state['luxury-high'] ? `${(state['luxury-high'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='luxury' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'accessories' ? (
            <div className='editing'>
              <h4>Does the brand sell accessories?</h4>
              <div>
                <p>Accessories</p>
                {this.renderStyles('accessories')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='accessories' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell accessories?</h4>
              <p>Accessories: {state['accessories'] ? `${(state['accessories'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='accessories' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'bags' ? (
            <div className='editing'>
              <h4>Does the brand sell bags?</h4>
              <div>
                <p>Low end Handbags</p>
                {this.renderStyles('bags-low')}
                <p>High end Handbags</p>
                {this.renderStyles('bags-high')}
                <p>Other Bags</p>
                {this.renderStyles('bags-other')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='bags' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell bags?</h4>
              <p>Low end Handbags: {state['bags-low'] ? `${(state['bags-low'] * 100)}%` : '0%'}</p>
              <p>High end Handbags: {state['bags-high'] ? `${(state['bags-high'] * 100)}%` : '0%'}</p>
              <p>Other Bags: {state['bags-other'] ? `${(state['bags-other'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='bags' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'fitness' ? (
            <div className='editing'>
              <h4>Does the brand sell Fitness clothing?</h4>
              <div>
                <p>Swimwear Low-End</p>
                {this.renderStyles('swimwear-low')}
                <p>Swimwear Mid-Range</p>
                {this.renderStyles('swimwear-mid')}
                <p>Activewear</p>
                {this.renderStyles('activewear')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='fitness' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Fitness clothing?</h4>
              <p>Swimwear Low-End: {state['swimwear-low'] ? `${(state['swimwear-low'] * 100)}%` : '0%'}</p>
              <p>Swimwear Mid-Range: {state['swimwear-mid'] ? `${(state['swimwear-mid'] * 100)}%` : '0%'}</p>
              <p>Activewear: {state['activewear'] ? `${(state['activewear'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='fitness' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'outdoor' ? (
            <div className='editing'>
              <h4>Does the brand sell Outdoor Gear?</h4>
              <div>
                <p>Outdoor Gear</p>
                {this.renderStyles('outdoor-')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='outdoor' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Outdoor Gear?</h4>
              <p>Outdoor Gear: {state['outdoor-'] ? `${(state['outdoor-'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='outdoor' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'shoes' ? (
            <div className='editing'>
              <h4>Does the Brand sell shoes?</h4>
              <div>
                <p>Everyday Shoes</p>
                {this.renderStyles('shoes-everyday')}
                <p>Low-End Shoes</p>
                {this.renderStyles('shoes-low')}
                <p>Dressy Shoes</p>
                {this.renderStyles('shoes-dressy')}
                <p>Sport Shoes</p>
                {this.renderStyles('shoes-sport')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='shoes' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell shoes?</h4>
              <p>Everyday Shoes: {state['shoes-everyday'] ? `${(state['shoes-everyday'] * 100)}%` : '0%'}</p>
              <p>Low-End Shoes: {state['shoes-low'] ? `${(state['shoes-low'] * 100)}%` : '0%'}</p>
              <p>Dressy Shoes: {state['shoes-dressy'] ? `${(state['shoes-dressy'] * 100)}%` : '0%'}</p>
              <p>Sport Shoes: {state['shoes-sport'] ? `${(state['shoes-sport'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='shoes' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'underwear' ? (
            <div className='editing'>
              <h4>Does the Brand sell underwear?</h4>
              <div>
                <p>Mid range Lingerie</p>
                {this.renderStyles('underwear-mid')}
                <p>High End Lingerie</p>
                {this.renderStyles('underwear-high')}
                <p>Basic Underwear/Socks</p>
                {this.renderStyles('underwear-basic')}
                <p>Low End Bras/Hoisery</p>
                {this.renderStyles('underwear-low')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='underwear' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell underwear?</h4>
              <p>Mid range Lingerie: {state['underwear-mid'] ? `${(state['underwear-mid'] * 100)}%` : '0%'}</p>
              <p>High End Lingerie: {state['underwear-high'] ? `${(state['underwear-high'] * 100)}%` : '0%'}</p>
              <p>Basic Underwear/Socks: {state['underwear-basic'] ? `${(state['underwear-basic'] * 100)}%` : '0%'}</p>
              <p>Low End Bras/Hoisery: {state['underwear-low'] ? `${(state['underwear-low'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='underwear' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'style-scores' ? (
            <div className='editing'>
              <h4>Style Scores</h4>
              <div>
                <p>Casual</p>
                {this.renderStyles('casual')}
                <p>Classic</p>
                {this.renderStyles('classic')}
                <p>Feminine</p>
                {this.renderStyles('feminine')}
                <p>Sporty</p>
                {this.renderStyles('sporty')}
                <p>Trendy</p>
                {this.renderStyles('trendy')}
              </div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='style-scores' onClick={this.handleSave}>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Style Scores</h4>
              <p>Casual: {state['casual'] ? `${(state['casual'] * 100)}%` : '0%'}</p>
              <p>Classic: {state['classic'] ? `${(state['classic'] * 100)}%` : '0%'}</p>
              <p>Feminine: {state['feminine'] ? `${(state['feminine'] * 100)}%` : '0%'}</p>
              <p>Sporty: {state['sporty'] ? `${(state['sporty'] * 100)}%` : '0%'}</p>
              <p>Trendy: {state['trendy'] ? `${(state['trendy'] * 100)}%` : '0%'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='style-scores' onClick={this.handleEdit}>Edit</button></div>
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
    qa: state.qa,
    pre_qa: state.preQa,
  }
}

export default connect(mapStateToProps, { fetchAllStyles, fetchStyles, updateStyles, createStyles })(SuppDataStyles)
