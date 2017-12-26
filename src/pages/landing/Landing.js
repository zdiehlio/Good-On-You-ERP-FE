import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components';
import './Landing.css';
import { connect } from 'react-redux';
import { fetchBrands, fetchUsers } from '../../actions';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'
import { login, fetchUserInfo } from '../../actions';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Landing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0
    }
  }


  componentWillMount(){
    if (sessionStorage.email) {
      this.props.fetchUserInfo(this.props.email)
    }
      this.setState({
        page: 1
      })
  }

  onSubmit(values) {
    this.props.login(values);

  }




  renderField(field) {
    return (
      <div>
        <MuiThemeProvider>
          <TextField
            floatingLabelText={field.label}
            type={field.type}
            {...field.input}
          />
        </MuiThemeProvider>
      </div>
    )
  }


  renderPage = (handleSubmit) => {
    switch (this.state.page) {
      case 0:
      return(
        <h2>Loading...</h2>
      )
      case 1:
        return (this.props.user ? (
          <div className="page-container">
            <div className="search-container">
              <div className="button-and-search">
                <span><Link to='/createBrand' className="landingButton">
                  Create Brand
                </Link></span>
                <BrandSearchBar/>
              </div>
              { this.props.user.role == "admin" ? (
                <div className="button-and-search">
                  <span>
                    <Link to='/createUser' className="landingButton">
                      Create User
                    </Link>
                  </span>
                  <UserSearchBar/>
                </div>) : <div></div>}
              </div>

            <ul className="list-container">
              {this.props.users ? (this.props.users.data.map((user, i) => {
                return <Brand key={i} handleViewSummaryClick={this.props.handleViewSummaryClick} name={user.username}/>
              })) : <div></div>}
            </ul>

            <ul className="list-container">
              {console.log('brands', this.props.brands)}
              {this.props.brands ? (this.props.brands.data.map((brand) => {
                return <li key={brand.id}> <Link to={`/brandLanding/${brand.id}`}>{brand.name} </Link></li>
              })) : <div></div>}
            </ul>
          </div>
        ) : (
          <div className="page-container">
            <h2 className="title">Log on</h2>
            <div className="form-container">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                  label="Email*"
                  name="email"
                  type="email"
                  component={this.renderField}
                ></Field>
                <Field
                  label="Password*"
                  name="password"
                  type="password"
                  component={this.renderField}
                ></Field>
                <button className="button" style={{width: "100%", marginTop: "20px"}}>Go</button>
              </form>
            </div>
          </div>
        ))
      default:
      return (
        <div className="page-container">
          <h2 className="title">Log on</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Email*"
                name="email"
                type="email"
                component={this.renderField}
              ></Field>
              <Field
                label="Password*"
                name="password"
                type="password"
                component={this.renderField}
              ></Field>
              <button className="button" style={{width: "100%", marginTop: "20px"}}>Go</button>
            </form>
          </div>
        </div>)
    }
  }


  render() {
    const { handleSubmit } = this.props;

    return (
      this.renderPage(handleSubmit)
    );
  }
}






function mapStateToProps(state) {
  console.log(state);
  return {...(state.login ? state.search : {search:{}}), ...state.login}
}

export default reduxForm({
  form: "LoginForm"
})(
  connect(mapStateToProps, { login, fetchUserInfo })( Landing )
)
