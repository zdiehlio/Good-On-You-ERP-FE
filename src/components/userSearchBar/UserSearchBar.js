import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900} from 'material-ui/styles/colors';
import "./UserSearchBar.css";
import { fetchUsers } from '../../actions';
import { connect } from 'react-redux'

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
      users: ''
    };
  }

  handleSearch = (event) => {
    this.props.fetchUsers(this.state.users)
  }

  handleChange = (event) => {
    this.setState({
      users: event
    })
  }

  render() {
    return <div className="searchBar">
      <MuiThemeProvider muiTheme={muiTheme}>
        <SearchBar
          value={this.state.search}
          onRequestSearch={this.handleSearch}
          style={this.style}
          placeholder="Search User"
          onChange={this.handleChange}
        />
      </MuiThemeProvider>
    </div>
  }
}

export default connect(null, { fetchUsers })(UserSearchBar)
