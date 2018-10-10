import React, { Component } from 'react'
import Header from '../Layout/header'
import { Link, Redirect } from 'react-router-dom'

export default class manual extends Component {
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
      if(!this.state.redirect){
        return (
            <div>
                <Header />
              <div class="container my-5" style={{marginTop:'120px', marginBottom:'30px'}}>
                  <div class="row justify-content-center">
                      <div class="col-lg-10 col-md-10">
                          <div class="card" style={{marginTop:'120px', marginBottom:'30px'}}>
                              <div class="card-body">
                                  <h2>Manual Payment</h2>
                                  <h5>Please kindly contact us with the infomations below:</h5>
                                  <ul class="text-left">
                                      <li>Phone: 0804567834</li>
                                      <li>Email: otitojuoluwapelumi@gmail.com</li>
                                      <li>Branch office: No 56, Ganaja junction, Lokoja Kogi state</li>
                                      <li>Head office: No 24, Ben Thomas Qtrs, Kabba Kogi state</li>
                                  </ul>
                                  <hr/>
                                      <p class="text-left">Notice: Your request will be completed when negotiation has been made</p>
                                  <div class="text-right">
                                  <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                      Submit <i class="fa fa-cc-arrow" aria-hidden="true"></i>
                                  </button>
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
                      <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      ...
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
              </div>
          </div>
      </div>
            </div>
          )
      }
      else {
        return <Redirect to="/" />
      }

  }
}
