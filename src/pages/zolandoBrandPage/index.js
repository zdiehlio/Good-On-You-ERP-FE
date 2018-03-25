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
        <div> {zprops.ratings.score} / {zprops.ratings.max_score} </div>
      )
    } else {
      return (
        <div> Total Score {zprops.ratings.score} / {zprops.ratings.max_score} </div>
      )
    }

  }

  renderRatings() {
    const zprops = this.props.zolando
    if (this.state.isLoading === true ){
      return ( <Loader active inline='centered'/>)
    } else if (!zprops) {
      return _.map(zprops.ratings.headlines, headline => {
        const name = (headline.name).replace(/\b\w/g, function (l) { return l.toUpperCase() })
        return (
          <div key={this.brandId} className="rating">
            <h5>{name}</h5>
            <h5>{headline.score} / {headline.max_score}</h5>
            <h5>{headline.label}</h5>
          </div>
        )
      })
    } else {
      return _.map(zprops.ratings.headlines, headline => {
        const name = (headline.name).replace(/\b\w/g, function (l) { return l.toUpperCase() })
        return (
          <div key={this.brandId} className="rating">
            <h5>{name}</h5>
            <h5>{headline.score} / {headline.max_score}</h5>
            <h5>{headline.label}</h5>
          </div>
        )
      })
    }
  }

  renderDate() {
    if (this.state.isLoading === true) {
      return( <Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      let date = this.props.zolando.last_updated
      return(
        <h5> {date}</h5>
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
        <p>Lorem ipsum dolor sit amet, dicat tation intellegat pro te. Error mucius scaevola mel ea,
          inani epicurei incorrupte vel et. Ad dolorum suscipiantur mea, ad eam quando oportere euripidis.
          Cu soleat euismod moderatius vim. At quo alii inani moderatius, sea ut omnium conceptam.
        </p>
        
        <p>
          Utamur abhorreant ea his, antiopam conceptam dissentiet cum at. At sea scripta integre
          repudiandae. Nec meis nusquam moderatius ne, vim id vitae apeirian facilisi.
          Te vis brute option.
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
        <div>
          <div className="item">{ratings_label} / {ratings_dots} stars</div>
          <div className="item">[]</div>
          <div className="item">{sku}</div>
          <div className="item">{price}</div>
          <div className="item">{parent_company}</div>
          <div className="item">{size}</div>
          <div className="item">{contact_name} " "</div>
          <div className="item">{contact_email}</div>
        </div>
      )
    }
  }

  render() {
    const state = this.state
    const zprops = this.props.zolando
    console.log('zprops', this.props.zolando)
    console.log('zstate', this.state)
    return (
      <div className="brand-container">
        <div className='brand-cover'>
          <img src="https://placeimg.com/1500/200/nature/grayscale" />
          {/* <img src={zprops.cover}/> */}
        </div>
        <div className="brand">
          <div className="brand-card">
            <div className='brand-info'>
              <img src={zprops.logo} className="brand-logo" />
              <h2>{zprops.name}</h2>
              <h4>Headquarters | <a href={`https://${zprops.website}`} target="_blank">Website</a></h4>
              <p>{zprops.sentence}</p>
            </div>

            <div className="brand-info brand-details">
              <div className="item">Overall Rating</div>
              <div className="item">Categories</div>
              <div className="item">SKUs</div>
              <div className="item">Price</div>
              <div className="item">Parent Company</div>
              <div className="item">Size</div>
              <div className="item">Contact Name</div>
              <div className="item">Contact Email</div>
            </div>
            <div className="brand-info">
              <div>{this.renderDetails()}</div>            
            </div>
          </div>

          <div className="brand-card">
            <h2>Ratings</h2>
            <div className='brand-ratings rating'>
              {this.renderTotalScore()}
            </div>

            <div className='brand-ratings ratings'>
              {this.renderRatings()}
            </div>
          </div>

          <div className='brand-card brand-summary'>
            <h2>Details</h2>
            {this.renderLorem()}
            <div className="last-update">{this.renderDate()}</div>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {zolando: state.zolando, state}
}

export default connect(mapStateToProps, { brandsHomePage })( ZolandoBrandPage )
