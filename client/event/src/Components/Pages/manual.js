import React, { Component } from 'react'

export default class manual extends Component {
  render() {
    return (
      <div>
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
                            <button class="btn btn-primary">
                                Submit <i class="fa fa-cc-arrow" aria-hidden="true"></i>
                            </button>
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
