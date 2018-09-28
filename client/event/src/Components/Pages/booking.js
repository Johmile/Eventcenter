import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class booking extends Component {
  render() {
    return (
      <div>
        <div class="container my-5" style={{marginTop:'120px', marginBottom:'30px'}}>
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-10">
          <div class="card" style={{marginTop:'120px', marginBottom:'30px'}}>
            <div class="card-body">
            <h2>Occassion information</h2>
            <label>Type of Occassion</label>
            <select class="form-control" id="sel1">
                <option>--Select the type of occassion--</option>
                <option>Wedding</option>
                <option>Naming</option>
                <option>Burial</option>
                <option>Graduation</option>
                <option>Others</option>
            </select>

            <label>Date of occassion</label>
            <input type="date" class="form-control" placeholder=""/>
            <hr/>

            <h2 class="text-center">Personnal information</h2>
            <hr/>

            <div class="form-group row">
              <div class="col-sm-6">
                <label>Surname</label>
                <input type="text" class="form-control" placeholder=""/>
              </div>

              <div class="col-sm-6">
                <label>Other names</label>
                <input type="text" class="form-control" placeholder=""/>
              </div>
            </div>

            <label>Gender</label>
            <select class="form-control" id="sel1">
                <option>--Select your gender--</option>
                <option>Female</option>
                <option>Male</option>
            </select>

            <label>Address</label>
            <input type="text" class="form-control" placeholder=""/>

            <label>Phone Number</label>
            <input type="text" class="form-control" placeholder=""/>

            <label>Email</label>
            <input type="email" class="form-control" placeholder=""/>

            <hr/>
            <div class="text-right">
              <Link to="/payment"><button class="btn btn-primary">
                 Proceed to payment <i class="fa fa-cc-arrow" aria-hidden="true"></i>
              </button></Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
      </div>
    )
  }
}
