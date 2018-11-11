import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Header from '../Layout/header'
import Footer from '../Layout/footer'

export default class booking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      day:'',
      date:'',
      email:'',
      event_type:'',
      phone:''
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
   handleSubmit(e){
    e.preventDefault()
    const {day, date, email, phone, event_type} = this.state
    fetch('http://localhost:1000/book', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(this.state)
    })
    .then( res => res.json())
    .then( res => {
      //alert(res.message)
      if(res.message == 'successful'){
        document.getElementById('pay').style.visibility = 'visible'
        document.getElementById('request').style.visibility = 'hidden'
      }
      else{
        alert(res.message)
      }
    })
    .catch( err => console.log(err))
  }
  handleDate(e){
    this.setState({date: e.target.value})
  }
  handleDay(e){ this.setState({day: e.target.value}) }
  handleEmail(e){ this.setState({email: e.target.value})}
  handleEvent(e){ this.setState({ event_type: e.target.value})}
  handleGender(e){ this.setState({ gender: e.target.value})}
  handlePhone(e){ this.setState({phone: e.target.value})}
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
              <form onSubmit={this.handleSubmit.bind(this)}>
              <div class="form-group row">
                            <div class="col-sm-2">
                                <label>How many days</label>
                                <input type="number" class="form-control" placeholder="" required value={this.state.day} onChange={this.handleDay.bind(this)}/>            
                            </div>
                            <div className="col-sm-10">
                            <label>Date of Event</label>
                            <input type="date" class="form-control" placeholder="1" required value={this.state.date} onChange={this.handleDate.bind(this)}/>
                            </div>
              </div>
              <label>Type of Event</label>
              <select class="form-control" id="sel1" value={this.state.event_type} onChange={this.handleEvent.bind(this)} required>
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
                  <input type="phone" className="form-control" value={this.state.phone} onChange={this.handlePhone.bind(this)} required/>
                </div>
                <div className="col-sm-5">
                  <label>Email</label>
                  <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmail.bind(this)} required/>
                </div>
                <div className="col-sm-2">
                <label>Gender</label>
                  <select class="form-control" id="sel1" value={this.state.gender} onChange={this.handleGender.bind(this)} required>
                      <option>--Gender--</option>
                      <option>Female</option>
                      <option>Male</option>
                  </select>
                </div>
              </div>
              <div class="text-right">
              <Link to="/payment"><button className="btn btn-primary" style={{visibility:'hidden'}} id="pay">Pay Now!</button></Link>
              <button
                id="request"
               class="btn btn-success"
               onClick={this.handleSubmit.bind(this)}
               style={{visibility:'visible'}}
               >Submit Request</button> 
              </div>
              </form>
            </div>
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
