import React, { Component } from 'react'
import Header from '../Layout/header'
import Footer from '../Layout/footer'

export default class paystack extends Component {
  render() {
    return (
      <div>
          <Header />
            <div style={{marginTop:'120px', marginBottom:'30px'}}>
                    <h5  class="h1-responsive font-weight-bold text-center my-5" >paystack Here</h5>
                    <p class="text-center w-responsive mx-auto mb-5">Paystack makes your payment easy and secure, pay for your center today.</p>
                <div className="text-center">
                    <button className="btn btn-warning hoverable" onClick="PayStack">Click to pay !</button>
                </div>
                <div>
                <ul class="list-unstyled list-inline text-center" style={{fontSize:'80px'}}>
                    <li class="list-inline-item" >
                        <a class="btn-floating btn-fb mx-1">
                        <i class="fa fa-cc-paypal"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item" >
                        <a class="btn-floating btn-tw mx-1">
                        <i class="fa fa-cc-mastercard"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-li mx-1">
                        <i class="fa fa-credit-card"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-visa mx-1">
                        <i class="fa fa-cc-visa"> </i>
                        </a>
                    </li>
                    </ul>
                </div>
            </div>
        <Footer />
      </div>
    )
  }
}
