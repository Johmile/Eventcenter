import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'


export default class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: null,
      id:''
    }
  }
  async componentWillMount() {
    const token = await window.localStorage.getItem('token')
    const id = await window.localStorage.getItem('clientId')
    this.setState({token: token, id:id})
  }
  async handleLogOut() {
    await window.localStorage.clear()
  }
  
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
                    {this.state.token ? (
                      <ul class="navbar-nav mr-auto">
                      
                      <li className="nav-item">
                        <Link to='/dashboard' className="nav-link ">
                           Catering service
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/dashboard' className="nav-link ">
                           Book bouncer
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/profile/${this.state.id}`} className="nav-link ">
                           Profile
                        </Link>
                    </li>
                      <li className="nav-item"><Link to='/' className="nav-link      btn-danger text-white"  onClick={this.handleLogOut.bind(this)}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i> Log Out
                      </Link></li>
                      
                      
                      </ul>
                      
                    ) : (
                      <ul class="navbar-nav mr-auto">
                      <li className="nav-item"><Link to='/login' className="nav-link btn-indigo text-white">
                        <i className="fa fa-sign-in" aria-hidden="true"></i> Sign In
                      </Link></li>
                      <li className="nav-item"><Link to='/register' className="nav-link  text-dark">
                        <i className="fa fa-sign-in" aria-hidden="true"></i> Sign up
                      </Link></li>
                      </ul>
                    )
                  }
                        
                        
                        
                        
                    </div>
                </div>
            </nav>
  
        </header>
      </div>
    )
  }
}
