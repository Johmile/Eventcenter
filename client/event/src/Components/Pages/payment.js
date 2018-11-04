import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../Layout/header'
import Footer from '../Layout/footer'

export default class payment extends Component {
  constructor(props){
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
  handleSwitch(e) {
    e.preventDefault()
    if(document.getElementById('sel1').value == 'Manual'){
      this.props.history.push('/manual')
    }
    else if(document.getElementById('sel1').value == 'Online payment with paystack'){
      this.props.history.push('/paystack')
    }
    else{
      alert('Please select something nice')
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
              <h2>Payment</h2>
              <h5>Please select how you make your payment</h5>
              <label>Type of payment</label>
              <select class="form-control" id="sel1">
                  <option>--Select payment method--</option>
                  <option>Manual</option>
                  <option>Online payment with paystack</option>
  
              </select>
  
              <hr/>
              <div class="text-right">
                <button class="btn btn-primary" onClick={this.handleSwitch.bind(this)}>
                  Continue <i class="fa fa-cc-arrow" aria-hidden="true"></i>
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
    else{
     return <Redirect to="/" />
    }

  }
}
