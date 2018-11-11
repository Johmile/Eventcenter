import React, { Component } from 'react'
import Header from '../Layout/header'
import Footer from '../Layout/footer'
import {updateCenter} from '../api/api'

export default class centerStatus extends Component {
    constructor(props){
        super(props);
        this.state ={
            available:''
        }
    }
    async handleSubmit(e){
        const {available } = this.state
        const updates = await updateCenter(this.props.match.params.id, this.state)
        console.log(updates)
    }
  render() {
    return (
      <div>
        <Header />
          <div class="container my-5" style={{marginTop:'120px', marginBottom:'30px'}}>
              <div class="row justify-content-center">
              <div class="col-lg-10 col-md-10">
              <div class="card" style={{marginTop:'120px', marginBottom:'30px'}}>
              <div class="card-body">
              <h5>Change center status here</h5>
              <label>Status</label>
              <select class="form-control" id="sel1">
                  <option>--Select status--</option>
                  <option>true</option>
                  <option>false</option>
  
              </select>
  
              <hr/>
              <div class="text-right">
                <button class="btn btn-primary">
                  Change status <i class="fa fa-cc-arrow" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    )
  }
}
