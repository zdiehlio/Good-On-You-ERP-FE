import React, {Component} from 'react'

import './brandCauses.css'

class BrandCauses extends Component {
  constructor(props){
    super(props);

    this.state = {
      brandOrigin: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
  }

  render() {
    return(
      <form className='contact-form'>
        <form>
        <h6>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h6>
        <h6>Made In *</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Australia
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Canada
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />New Zealand
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />USA
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />None of the Above
        </form>
        <form>
        <h6>Is the Brand Certified B-Corp?</h6>
        <h6>B-Corp</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Is certified B-Corp
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Is not certified B-corp
        </form>
        <form>
        <h6>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h6>
        <h6>Social Enterprise</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Brand is a social enterprise that provides employment for people from a disadvantaged background
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Brand is not a social enterprise that provides employment for people from a disadvantaged background
        </form>
        <form>
        <h6>Does the brand have a 1 for 1 model?</h6>
        <h6>1 for 1 *</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Brand has a 1 for 1 model
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Brand does not have a 1 for 1 model
        </form>
        <form>
        <h6>Is the brand Vegan?</h6>
        <h6>Vegan *</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Brand is 100% Vegan
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />Brand is not Vegan
        </form>
        <form>
        <h6>Are 100% of products certified Fair Trade?</h6>
        <h6>Fair Trade *</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />100% of products are certified Fair Trade
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />-50% of products are certified Fair Trade
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />There is no evidence of any/many products being certified Fair Trade
        </form>
        <form>
        <h6>Are 100% of products made from certified Organic materials?</h6>
        <h6>Organic Materials *</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />100% of products are made from certified Organic materials
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />-50% of products are made from certified Organic materials
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />There is no evidence of any/many products are made from certified Organic materials
        </form>
        <form>
        <h6>Are 100% of products made from a substantial proportion(-50%) of recycled/upcycled materials?</h6>
        <h6>Recycled *</h6>
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />100% of products are made from as substantial proportion recycled/upcycled materials
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />-50% of products are made from as substantial proportion recycled/upcycled materials
          <input
            type= 'radio'
            name='brandOrigin'
            value={this.state.brandOrigin}
            onChange={this.handleChange}
          />There is no evidence that any/many products are made from as substantial proportion recycled/upcycled materials
        </form>
      </form>
    )
  }
}

export default BrandCauses
