import React, { Component } from 'react'
import './Summary.css';

class Summary extends Component {
  render() {
    return <div className="summary-container">
    <div className="summary-card">
        <p className="overall">Overall 18</p>
        <p>NIKE</p>

        <div class="container">
        <table class="responsive-table">
          <caption>Summary</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Theme</th>
              <th scope="col">Score</th>
              <th scope="col">Total</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">Environment</th>
              <td data-title="Theme"></td>
              <td data-title="Score" className="center"></td>
              <td data-title="Total" className="center">17</td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Resource</td>
              <td data-title="Score" className="center">15/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Energy</td>
              <td data-title="Score" className="center">16/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Chemicals</td>
              <td data-title="Score" className="center">17/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Water</td>
              <td data-title="Score" className="center">20/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row">Labour</th>
              <td data-title="Theme"></td>
              <td data-title="Score" className="center"></td>
              <td data-title="Total" className="center">19</td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Worker Policies</td>
              <td data-title="Score" className="center">5/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Wages</td>
              <td data-title="Score" className="center">25/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Suppliers</td>
              <td data-title="Score" className="center">10/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Practices</td>
              <td data-title="Score" className="center">20/25</td>
              <td data-title="Total" className="center"></td>
            </tr>
            <tr>
              <th scope="row">Animal</th>
              <td data-title="Theme"> </td>
              <td data-title="Score" className="center"></td>
              <td data-title="Total" className="center">16</td>
            </tr>
            <tr>
              <th scope="row"> </th>
              <td data-title="Theme">Rights</td>
              <td data-title="Score" className="center">5/5</td>
              <td data-title="Total" className="center"></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  }
}

export default Summary
