import React, { Component } from 'react'
import Header from '../Layout/header'
import Footer from '../Layout/footer'
import {PaystackButton} from 'react-paystack';
import  PaystackPop from 'paystack'

export default class paystack extends Component {
    //     state ={
    //         key:"pk_test_0927814c7edbb6dad98c75ef6d4cd0f774bd47c1",
    //         email:"otitojuoluwapelumi@gmail.com",
    //         amount: 100
    //     }
    //     callback = (response) => {
    // 		console.log(response); // card charged successfully, get reference here
    //     }
    //     close = () => {
    // 		console.log("Payment closed");
    // 	}
    
    // 	getReference = () => {
    // 		//you can put any unique reference implementation code here
    // 		let text = "successful";
    // 		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    
    // 		for( let i=0; i < 15; i++ )
    // 			text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    // 		return text;
    //     }
        
    //  makepayment(key, email, amount, ref, callback) {
    //         // var amount = document.getElementById('select').value * 100
    //         // var firstname = document.getElementById('firstname').value
    //         // var surname = document.getElementById('surname').value
    //         // var email = document.getElementById('email').value
    //         // var phone = document.getElementById('phone').value
    //         // var fullname = surname + " " + firstname
    //         var PaystackPop
    //         var handler = PaystackPop.setup({
    //             key: 'pk_test_0927814c7edbb6dad98c75ef6d4cd0f774bd47c1', // This is your public key only! 
    //             email: email || 'customer@gmail.com', // Customers email
    //             amount: amount || 40000, // The amount charged, I like big money lol
    //             // name: fullname,
    //             // phone:phone,
    //             ref:''+Math.floor((Math.random() * 1000000000) + 1), // Generate a random reference number and put here",
    //             metadata: { // More custom information about the transaction
    //              custom_fields: [
    //                 {
                       
    //                 }
    //              ]
    //             },
    //             callback: callback || function(response){
    //               let div = document.getElementById('res')
    //               div.innerHTML = "This was the json response reference </br />" + response.reference;
    //             }
    //             // ,
    //             // onClose: function(){
    //             //   alert('window closed');
    //             // }
    //         });
    //         // Payment Request Just Fired  
    //         handler.openIframe(); 
    //     }

  render() {
    return (
      <div>
          <Header />
            <div style={{marginTop:'120px', marginBottom:'30px'}}>
                    <h5  class="h1-responsive font-weight-bold text-center my-5" >paystack Here</h5>
                    <p class="text-center w-responsive mx-auto mb-5">Paystack makes your payment easy and secure, pay for your center today.</p>
                <div className="text-center">
                <a href="https://paystack.com/pay/oluwapelumicenter" className="btn btn-warning hoverable">Click to pay</a>
                    {/* <button className="btn btn-warning hoverable" id="makepayment" onClick={this.makepayment.bind(this)}>Click to pay !</button> */}
                </div>
                {/* <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={this.callback}
                close={this.close}
                disabled={true} 
                embed={true} 
                reference={this.getReference()}
                email={this.state.email}
                amount={this.state.amount}
                paystackkey={this.state.key}
              /> */}
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
