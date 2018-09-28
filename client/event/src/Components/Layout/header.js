import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'


export default class Navbar extends Component {
  render() {
    return (
      <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light fixed-top scrolling-navbar" >
                <div class="container" id="navbar">
                    <Link to='/'class="nav-link" style={{color:'black'}}><strong>Event Center</strong></Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent-7">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        
                        </ul>
                        
                        
                        <Link to='/login' className="nav-link btn-indigo text-white">
                        <i className="fa fa-sign-in" aria-hidden="true"></i> Sign In
                      </Link>
                      <Link to='/register' className="nav-link  text-dark">
                        <i className="fa fa-sign-in" aria-hidden="true"></i> Sign up
                      </Link>
                    </div>
                </div>
            </nav>
  
        </header>
      </div>
    )
  }
}
