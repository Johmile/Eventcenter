import React, { Component } from 'react'
import { getSingleCenter } from '../api/api'
import Footer from '../Layout/footer'
import { Link, Redirect } from 'react-router-dom'
import Header from '../Layout/header'

export default class center extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: '',
            available: true,
            msg:'',
            redirect: false,
            isLoading: true
        }
    }
    async componentDidMount() {

        const token = await window.localStorage.getItem('token')
        if(token){
            const center = await getSingleCenter(this.props.match.params.id)
            console.log(center.info)
            this.setState({center: center.info, available: center.info.available, msg: center.message, redirect: false, isLoading: false})
            if(this.state.available) {
                document.getElementById('avail').innerHTML = "Available for booking"
            }
            else{
               
                document.getElementById('book').style.visibility = 'hidden'
                document.getElementById('avail').innerHTML = 'Not available for booking'
                
                
            }
        }
        else{
            this.setState({redirect: true})         
        }
    }
  render() {
      if(!this.state.redirect) {
        return (
            <div>
                <Header />
              <div class="col-12" style={{marginTop:'120px', marginBottom:'30px'}}>
              <h1 id="not"></h1>
              {this.state.isLoading && <div id = "cupcake" class = "box">
                        <span class = "letter">L</span>

                        <div class = "cupcakeCircle box">
                                <div class = "cupcakeInner box">
                                <div class = "cupcakeCore box"></div>
                                
                                </div></div>
                        
                        <span class = "letter box">A</span>
                        <span class = "letter box">D</span>
                        <span class = "letter box">I</span>
                        <span class = "letter box">N</span>
                        <span class = "letter box">G</span>
                        <span class = "letter box">.</span>
                        <span class = "letter box">.</span>
                        <span class = "letter box">.</span>
                </div>}
            {
              this.state.center && (
                <div class="card">
                  <img class="card-img-top"  src={this.state.center.photo} />
                  <div class="card-body">
                      <h1 class="card-title text-center h4 mb-4" style={{fontStyle: 'italic',fontFamily: 'Times New Roman'}}>{ this.state.center.name }   
                      </h1>
                      <p class=" my-4">
                      <i class="fa fa-map-marker "></i> {this.state.center.address}
                      </p>
                      <hr/>
                          {this.state.center.facility}
                      <div class="row">
          
                          <div class="col-md-4 offset-md-1 mx-3 my-3">
                              <h3 class="text-left">Facilities</h3>
                              <ul class="text-left">
                                  <li>Chair:  {this.state.center.chair}</li>
                                  <li>Table:  {this.state.center.table}</li>
                                  <li>Rest room:  {this.state.center.toilet}</li>
                                  <li>Security:   {this.state.center.security}</li>
                                  <li>Parking space:  {this.state.center.parking}</li>
                                  <li>Tv:     {this.state.center.tv}</li>
                                  <li>Sound system:   {this.state.center.sound}</li>
                                  <li>Light:  {this.state.center.light}</li>
                              </ul>
                          </div>
                          <div class="col-md-4 offset-md-1 mx-3 my-3">
                              
                              <h3>Description</h3>
                              <p>{this.state.center.description}</p>
                          </div>
                          <div class="col-md-4 offset-md-1 mx-3 my-3">
                              
                              <h5>Status: <strong  id="avail"></strong></h5>
                          </div>
                      </div>
                      <div id="map" style={{height: '400px',width:'100px'}}></div>
                      <Link to="/booking">
                      <button className="btn btn-primary" id="book">Book</button>
                      </Link>
                  </div>
                </div>
              )
            }
              </div>
              <Footer/>
            </div>
          )
      }
      else {
          return <Redirect to="/" />
      }
    
  }
}
