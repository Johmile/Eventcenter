import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/dashboard.css'

export default class dashboard extends Component {
  render() {
    return (
      <div id="contain">
        <div id="dashboard">
        
        <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-md-12 mb-4 white-text text-center">
              <h1 class="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInDown" data-wow-delay="0.3s"><strong>Welcome to Event planning center</strong></h1>
              <hr class="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
              <h5 class="text-uppercase mb-4 white-text wow fadeInDown" data-wow-delay="0.4s"><strong>Photography & design</strong></h5>
              <Link to="/login" class="btn btn-outline-white wow fadeInDown" data-wow-delay="0.4s">Get Started</Link>
              <a class="btn btn-outline-white wow fadeInDown" data-wow-delay="0.4s">About me</a>
            </div>
          </div>
        </div>
      </div>
    
        </div>
      </div>
    )
  }
}
