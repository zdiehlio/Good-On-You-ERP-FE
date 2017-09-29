import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900} from 'material-ui/styles/colors';
import "./UserSearchBar.css";

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

class UserSearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      brand: '',
    };
  }

  handleSearch(event) {
    // this.setState({...this.state, search: event});
  }

  render() {
    return <div className="searchBar">
      <MuiThemeProvider muiTheme={muiTheme}>
        <SearchBar
          value={this.state.search}
          onKeyPress={this.handleSearch.bind(this)}
          onRequestSearch={this.handleSearch.bind(this)}
          style={this.style}
          placeholder="Search User"
        />
      </MuiThemeProvider>
    </div>
  }
}

export default UserSearchBar
