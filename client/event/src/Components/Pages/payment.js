import React, { Component } from 'react'
import {Link } from 'react-router-dom'

export default class payment extends Component {
  render() {
    return (
      <div>
        <div class="container my-5" style={{marginTop:'120px', marginBottom:'30px'}}>
            <div class="row justify-content-center">
            <div class="col-lg-10 col-md-10">
            <div class="card" style={{marginTop:'120px', marginBottom:'30px'}}>
            <div class="card-body">
            <h2>Payment</h2>
            <h5>Please select how you make your payment</h5>
            <label>Type of payment</label>
            <select class="form-control" id="sel1">
                <option>--Select payment method--</option>
                <option>Manual</option>
                <option>Online payment</option>

            </select>

            

            <hr/>
            <div class="text-right">
             <Link to="/manual"> <button class="btn btn-primary">
                Continue <i class="fa fa-cc-arrow" aria-hidden="true"></i>
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
