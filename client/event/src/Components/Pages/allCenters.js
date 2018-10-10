import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getAllCenters } from '../api/api'
import Footer from '../Layout/footer'
import Header from '../Layout/header'
import '../css/cupcake.css'

export default class eventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers:[],
            token: null,
            redirect: false,
            isLoading: true
        }
    }
    async componentDidMount() {
        const token =  await window.localStorage.getItem('token')
        if(token){
            const centers = await getAllCenters()
            this.setState({centers:centers.info, token: token, redirect: false, isLoading: false})
        }
        else{
            this.setState({redirect: true})
        }

    }
  render() {

    if(!this.state.redirect){
        return (
            <div>
                <Header />
                <section class="container text-center" style={{marginTop:'120px'}}>
                <h3>Available centers
                </h3>
                <hr class="hr-class" />
              </section>
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
              <div class="card-deck" style={{marginTop:'20px'}}>
                  { this.state.centers ? this.state.centers.map( (center, index) => (
                      <div class="col-md-4">
                          <div class="card" style={{marginBottom:'20px'}}>
                              <div class="">
                                  <img class="card-img-top "  src={require('../images/capital.jpg')} class="img-fluid" alt=""/>
                              </div>
                              <div class="card-body">    
                                      <h4 class="card-title" style={{fontStyle: 'italic',fontFamily: 'Times New Roman'}}><strong> {center.name}</strong></h4>                       
                                      <h6 class="card-title"><i class="fa fa-map-marker "></i> {center.address}</h6>
                                      <h6 class="card-title">{center.capacity} Capacity</h6>
                                      <hr/>
                                  <div class="seeButton" >
                                      <Link to={`/center/${center._id}`}>
                                      <button class="btn btn-outline-danger" id="butt">
                                      See Features
                                      </button></Link>
                                  </div>
                              </div>
                          </div>
                  </div>
                  )) : (
                      <h1> No available center</h1>
                  )}
                      
              </div>
                  <Footer/>
      
            </div>
          )
    }
    else{
        return <Redirect to='/'/>
    }
  }
}
