import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { brandsHomePage } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { Loader, Form, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import './zalandoBrandPage.css'
import { Price } from '../../components'


class ZalandoBrandPage extends Component {


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

  renderBrandCover() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return (
        <div> <img src='https://picsum.photos/1500/300' /> </div>
      )
    } else {
      const zcover = this.props.zolando.cover
      return (
        <div>
          <img src={zcover} />
        </div>
      )
    }
  }
  renderDots() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else {
      const dots = this.props.zolando.ratings.dots
      return (
        <span>
          {dots >= 1 ? <Icon color='teal' name='circle fitted' /> : <Icon name='circle fitted thin' />}
          {dots >= 2 ? <Icon color='teal' name='circle fitted' /> : <Icon name='circle fitted thin' />}
          {dots >= 3 ? <Icon color='teal' name='circle fitted' /> : <Icon name='circle fitted thin' />}
          {dots >= 4 ? <Icon color='teal' name='circle fitted' /> : <Icon name='circle fitted thin' />}
          {dots >= 5 ? <Icon color='teal' name='circle fitted' /> : <Icon name='circle fitted thin' />}
        </span>
      )
    }
  }


  renderTotalScore() {
    const zprops = this.props.zolando
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else {
      return (
        <span> {zprops.ratings.score} / {zprops.ratings.max_score} </span>
      )
    }
  }

  renderRatings() {
    const zprops = this.props.zolando
    if (this.state.isLoading === true ){
      return ( <Loader active inline='centered'/>)
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
      let categories = (this.props.zolando.categories).join(', ')

      return (
        <table className='table-details'>
          <tr><td>Overall Rating</td><td className='item'>{ratings_label} {this.renderDots()}</td></tr>
          { (categories) ? <tr><td>Categories</td><td className='item'>{categories}</td></tr> : null }
          { (sku) ? <tr><td>SKUs</td><td className='item'>{sku}</td></tr> : null }
          { (price) ? <tr><td>Price</td><td className='item'><Price price={price} /></td></tr> : null }
          { (parent_company) ? <tr><td>Parent Company</td><td className='item'>{parent_company}</td></tr> : null }
          { (size) ? <tr><td>Size</td><td className='item'>{size}</td></tr> : null }
          { (contact_name) ? <tr><td>Contact Name</td><td className='item'>{contact_name} ' '</td></tr> : null }
          { (contact_email) ? <tr><td>Contact Email</td><td className='item contact-email'>{contact_email}</td></tr>  : null }
        </table>
      )
    }
  }

  renderLabel() {
    if (this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if (!this.props.zolando) {
      return (
        <h5> loading... </h5>
      )
    } else {
      let ratings_label = this.props.zolando.ratings.label
      return (
        <span>{ratings_label}</span>
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
          <img src={zprops.cover} />
          <Link to='/zalandoSearch' className='back-to-search'>Back to Search Results</Link>
        </div>
        <div className='brand-page'>
          <div className='brand-card'>
            <div className='brand-home'>
              <img src={zprops.logo} className='brand-logo' />
              <div className='brand-title'>{zprops.name}</div>
              <p className='brand-hq'>{(zprops.headquarters) ? zprops.headquarters : 'Headquarters'} / <a href={zprops.website ? zprops.website.slice(0, 3) !== 'http' ? `http://${zprops.website}` : zprops.website : ''} target='_blank' className='web'>Website</a></p>
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
                <tr>
                  <td> Total Score </td>
                  <td>{this.renderTotalScore()}</td>
                  <td>
                    {this.renderLabel()} <span> {this.renderDots()}</span>
                  </td>
                </tr>
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

export default connect(mapStateToProps, { brandsHomePage })( ZalandoBrandPage )
