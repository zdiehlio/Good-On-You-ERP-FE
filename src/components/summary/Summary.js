import React, { Component } from 'react'
import {Card} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal900} from 'material-ui/styles/colors';
import './Summary.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: teal900
  }
});

class Summary extends Component {

  render() {
    return <div className="summary">
      <div className="summary-container">
        <MuiThemeProvider muiTheme={muiTheme}>
          <Card>
            <p>Summary</p>
            <p>NIKE</p>
            <tr>
        <th colspan="2">
          <b>Total Fat</b>
          14g
        </th>
        <td>
          <b>22%</b>
        </td>
      </tr>
      <tr>
        <td class="blank-cell">
        </td>
        <th>
          Saturated Fat
          9g
        </th>
        <td>
          <b>22%</b>
        </td>
      </tr>
      <tr>
        <td class="blank-cell">
        </td>
        <th>
          Trans Fat
          0g
        </th>
        <td>
        </td>
      </tr>
      <tr>
        <th colspan="2">
          <b>Cholesterol</b>
          55mg
        </th>
        <td>
          <b>18%</b>
        </td>
      </tr>
      <tr>
        <th colspan="2">
          <b>Sodium</b>
          40mg
        </th>
        <td>
          <b>2%</b>
        </td>
      </tr>
      <tr>
        <th colspan="2">
          <b>Total Carbohydrate</b>
          17g
        </th>
        <td>
          <b>6%</b>
        </td>
      </tr>
      <tr>
        <td class="blank-cell">
        </td>
        <th>
          Dietary Fiber
          1g
        </th>
        <td>
          <b>4%</b>
        </td>
      </tr>
      <tr>
        <td class="blank-cell">
        </td>
        <th>
          Sugars
          14g
        </th>
        <td>
        </td>
      </tr>

          </Card>
        </MuiThemeProvider>
      </div>
    </div>
  }
}

export default Summary
