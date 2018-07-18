import React, { Component } from 'react'
import { Link, Route} from 'react-router-dom'
import Login from './login'
import '../css/bootstrap.min.css'
import '../css/dashboard.css'

export default class dashboard extends Component {
  render() {
    return (
      <div id="contain">
        <div id="dashboard">
        <h1>Welcome to Event planning center</h1>
        <Link to="/login">
            <button class="btn btn-primary btn-large active">Get Started</button>
        </Link>
    
        </div>
      </div>
    )
  }
}
