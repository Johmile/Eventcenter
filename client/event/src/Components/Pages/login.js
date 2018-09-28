import React, { Component } from 'react'
import {  Link } from 'react-router-dom'
import '../css/login.css'
import Footer from '../Layout/footer'


export default class login extends Component {
    constructor(){
        super()
        this.state = {
            email:"",
            password:""
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }
    // componentDidMount() {
    //    this.handleSubmit()
    // }
    handleSubmit(e){
        e.preventDefault()
        fetch('/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                
            },
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
        })
        .then(res=> res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
    
    }
    validateForm(e){
        this.setState({
            email:e.target.value
        })
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }
  render() {
        const logged = this.state 
    return (
        <div>
            <div style={{marginTop:'120px'}}>
                <div class="container my-5" >
                        <div class="row justify-content-center">
                            <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="card text-center card-form">
                                <div class="card-body">
                                <h3 class=""><i class="fa fa-user "></i> Sign In</h3>
                                <h6 class="font-weight-light">Enter your login details</h6>

                                <div class="md-form">
                                
                                <input type="email" id="form2" class=" form-control" value={this.state.email} onChange={this.validateForm}/>
                                <label for="form2" class="active">Email</label>
                                </div>
                                <div class="md-form">
                                
                                <input type="password" id="form4" class="form-control" value={this.state.password} onChange={this.handlePassword}/>
                                <label for="form4">Password</label>
                                </div>
                                
                                <button
                                    class="btn btn-indigo btn-block"
                                    onClick={this.handleSubmit}
                                    >
                                    <i class="fa fa-sign-in" aria-hidden="true"></i> Sign In
                                    </button>
                                
                                <hr/>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
            <Footer/>
            
      </div>
    )
  }
}
