import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Header from '../Layout/header'
import Footer from '../Layout/footer'

export default class booking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }
  async componentDidMount() {
    const token = await window.localStorage.getItem('token')
    if(token) {
      this.setState({redirect: false})
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
          <div class="container my-5" style={{marginTop:'120px', marginBottom:'30px'}}>
          <div class="row justify-content-center">
            <div class="col-lg-10 col-md-10">
            <div class="card" style={{marginTop:'120px', marginBottom:'30px'}}>
              <div class="card-body">
              <h2>Event information</h2>
              <div class="form-group row">
                            <div class="col-sm-2">
                                <label>How many days</label>
                                <input type="number" class="form-control" placeholder="" required/>            
                            </div>
                            <div className="col-sm-10">
                            <label>Date of Event</label>
                            <input type="date" class="form-control" placeholder="1"/>
                            </div>
              </div>
              <label>Type of Event</label>
              <select class="form-control" id="sel1">
                  <option>--Select the type of event--</option>
                  <option>Wedding</option>
                  <option>Naming</option>
                  <option>Burial</option>
                  <option>Graduation</option>
                  <option>Others</option>
              </select>
              
              <div className="form-group row">
                <div className="col-sm-5">
                  <label>Phone number</label>
                  <input type="phone" className="form-control"/>
                </div>
                <div className="col-sm-5">
                  <label>Email</label>
                  <input type="email" className="form-control"/>
                </div>
                <div className="col-sm-2">
                <label>Gender</label>
                  <select class="form-control" id="sel1">
                      <option>--Gender--</option>
                      <option>Female</option>
                      <option>Male</option>
                  </select>
                </div>
              </div>
              <div class="text-right">
              <button class="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter">Get price details</button>
                
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      
          <div class="modal-dialog modal-dialog-centered" role="document">
      
      
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">Price Details</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <h3>Venue Price: #200,000</h3>
                      <h3>Date of event</h3>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <a href="/payment"><button class="btn btn-primary">
                        Proceed to payment <i class="fa fa-cc-arrow" aria-hidden="true"></i>
                      </button></a>
                  </div>
              </div>
          </div>
        </div>
        <Footer />
        </div>
      )
    }
    else {
      return <Redirect to="/" />
    }
    
  }
}
