import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900} from 'material-ui/styles/colors';
import "./BrandSearchBar.css";
import { connect } from 'react-redux';
import { fetchBrands } from '../../actions';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900
  }
});

const style = {
  margin: '0 auto',
  maxWidth: 1200,
  height: '10px'
};

class BrandSearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      brand: ''
    };
  }

  handleSearch = (event) => {
    this.props.fetchBrands()
  }

  handleChange = (event) => {
    this.setState({
      brand: event
    })
  }

  render() {
    return <div className="searchBar">
      <MuiThemeProvider muiTheme={muiTheme}>
        <SearchBar
          value={this.state.search}
          onRequestSearch={this.handleSearch}
          style={this.style}
          placeholder="Search Brand"
          onChange={this.handleChange}
        />
      </MuiThemeProvider>
    </div>
  }
}


export default connect(null, { fetchBrands })(BrandSearchBar)
