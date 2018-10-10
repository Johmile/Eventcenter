import React, { Component } from 'react'
import {  Link, Redirect } from 'react-router-dom'
import '../css/login.css'
import '../css/spinner.css'
import Footer from '../Layout/footer'
import Header from '../Layout/header'


export default class login extends Component {
    constructor(){
        super()
        this.state = {
            email:"",
            password:"",
            redirect: false,
            isLoading: false
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        document.getElementById('butt').innerHTML = 'Please wait...'
        this.setState({isLoading: true})
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
        .then( res => res.json())
        .then( res =>{
            if(res.auth == true){
                window.localStorage.setItem('token', res.token)
                window.localStorage.setItem('clientId', res.id)
                this.setState({redirect: true, isLoading: false})
            }
            else{
                alert(res.message)
                document.getElementById('butt').innerHTML = 'sign in'
                document.getElementById('alert').innerHTML = res.message
                this.setState({isLoading: false})
            }
        })
        .catch( err =>console.log(err))   
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
      if(!this.state.redirect){
        return (
            <div>
                <Header />
                <div style={{marginTop:'120px'}}>
                    <div class="container my-5" >
                    <div class=" alert alert-danger alert-dismissible fade show " role="alert" style={{width: 'auto', display:'none'}} id="main">
                        <strong id="alert"></strong> 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
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
                                        id="butt">
                                        <i class="fa fa-sign-in" aria-hidden="true"></i> Sign In
                                        </button>
                                    
                                        <hr/>
                                        {this.state.isLoading && <div class="preloader-2" id="dive">
                                            <span class="line line-1"></span>
                                            <span class="line line-2"></span>
                                            <span class="line line-3"></span>
                                            <span class="line line-4"></span>
                                            <span class="line line-5"></span>
                                            <span class="line line-6"></span>
                                            <span class="line line-7"></span>
                                            <span class="line line-8"></span>
                                            <span class="line line-9"></span>
                                            <div>Loading...</div>
                                        </div>}
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
      else{
        return <Redirect to="/centers" />
      }
    
  }
}
