import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { brandsHomePage } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { Loader, Form } from 'semantic-ui-react'
import _ from 'lodash'
import './zolandoBrandPage.css'


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

  renderTotalScore() {
    const zprops = this.props.zolando
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!zprops) {
      return (
        <div> loading... </div>
      )
    } else {
      return (
        <tr><td>Total Score</td><td>{zprops.ratings.score} / {zprops.ratings.max_score}</td> <td>{zprops.ratings.label} / {zprops.ratings.dots}</td></tr>
      )
    }

  }

  renderRatings() {
    const zprops = this.props.zolando
    if (this.state.isLoading === true ){
      return ( <Loader active inline='centered'/>)
    } else if (!zprops) {
      return _.map(zprops.ratings.headlines, headline => {
        return (
          <div>Loading...</div>
        )
      })
    } else {
      return _.map(zprops.ratings.headlines, headline => {
        const name = (headline.name).replace(/\b\w/g, function (l) { return l.toUpperCase() })
        return (
          <tr><td>{name}</td><td>{headline.score} / {headline.max_score}</td><td>{headline.label}</td></tr>
        )
      })
    }
  }

  renderDate() {
    if (this.state.isLoading === true) {
      return( <Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return(
        <h5>Loading...</h5>
      )
    } else {
      let date = (this.props.zolando.last_updated)
      date = date.substring(0,10)
      return (
        <div> Last updated {date} </div>
      )
    }
  }

  renderLorem() {
    return (
      <div>
        <p>Know The Origin’s environment rating is ‘great’. It is certified by 
          OEKO-TEX standard 100 and uses 100% Global Organic Textile Standard 
          certified organic cotton to create high-quality, long-lasting products. 
          It re-uses off cuts created during the manufacturing process and reduces 
          its carbon footprint by hand-manufacturing its products. 
        </p>
        <p>
         It uses OEKO-TEX standard 100 certified dyes and publishes water 
           reduction policies with targets. Its labour rating is ‘great’. 
           It is certified by the Fair Trade Small Producer Standard and the 
           Global Organic Textile Standard. Its animal rating is ‘great’. 
           It does not use any animal products. Know The Origin is rated ‘Great’ 
           based on information from our own research.
        </p>
      </div>
    )
  }

  renderDetails() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return (
        <h5> loading... </h5>
      )
    } else {
      let ratings_label = this.props.zolando.ratings.label
      let ratings_dots = this.props.zolando.ratings.dots
      let sku = this.props.zolando.sku
      let price = this.props.zolando.price
      let parent_company = this.props.zolando.parent_company
      let size  = this.props.zolando.size
      let contact_name = this.props.zolando.contact.name
      let contact_email = this.props.zolando.contact.email
      
      return (
        <table className='table-details'>
          {/* <table className='item'>{ratings_label} / {ratings_dots} stars</div>
          <div className='item'>[]</div>
          <div className='item'>{sku}</div>
          <div className='item'>{price}</div>
          <div className='item'>{parent_company}</div>
          <div className='item'>{size}</div>
          <div className='item'>{contact_name} ' '</div>
          <div className='item contact-email'>{contact_email}</div> */}
          <tr><td>Overall Rating</td><td className='item'>{ratings_label} / {ratings_dots} stars</td></tr>
          <tr><td>Categories</td><td className='item'>[]</td></tr>
          <tr><td>SKUs</td><td className='item'>{sku}</td></tr>
          <tr><td>Price</td><td className='item'>{price}</td></tr>
          <tr><td>Parent Company</td><td className='item'>{parent_company}</td></tr>
          <tr><td>Size</td><td className='item'>{size}</td></tr>
          <tr><td>Contact Name</td><td className='item'>{contact_name} ' '</td></tr>
          <tr><td>Contact Email</td><td className='item contact-email'>{contact_email}</td></tr>
        </table>
      )
    }
  }

  render() {
    const state = this.state
    const zprops = this.props.zolando
    console.log('zprops', this.props.zolando)
    console.log('zstate', this.state)
    return (
      <div className='brand-container'>
        <div className='brand-cover'>
          <img src='https://placeimg.com/1500/200/nature/grayscale' />
          {/* <img src={zprops.cover}/> */}
        </div>
        <div className='brand-page'>
          <div className='brand-card'>
            <div className='brand-home'>
              <img src={zprops.logo} className='brand-logo' />
              <div className='brand-name'>{zprops.name}</div>
              <p className='brand-hq'>Headquarters / <a href={`https://${zprops.website}`} target='_blank' className='web'>Website</a></p>
              <p className='brand-sentence'>{zprops.sentence}</p>
            </div>

            <div className='brand-details'>
              <div>{this.renderDetails()}</div>            
            </div>
          </div>

          <div className='brand-card'>
            <div className='card-title'>Ratings</div>
            <div className='card-content'>          
              <table className='table-ratings'>
                {this.renderTotalScore()}
                {this.renderRatings()}
              </table>
            </div>
          </div>

          <div className='brand-card brand-summary'>
            <div className='card-title'>Details</div>
            <div className='card-content'> {this.renderLorem()} </div>

          </div>
          <div className='last-update'><i>{this.renderDate()}</i></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {zolando: state.zolando, state}
}

export default connect(mapStateToProps, { brandsHomePage })( ZolandoBrandPage )
