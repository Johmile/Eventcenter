import React, { Component } from 'react'
import '../css/register.css'
import Footer from '../Layout/footer'
import Header from '../Layout/header'
import { Redirect } from 'react-router-dom'

export default class register extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            secret:"",
            redirect: false,
            isLoading: false
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
    }
    
    handleRegister(e){
        e.preventDefault();
        //this.setState({isLoading: true})
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let secret = document.getElementById('secret').value;
        fetch('/register', {
            method:'POST',
            headers:{ 
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password,
                secret:secret
            })

        })
        .then(res => res.json())
        .then(res =>{
            if(res.auth == true){
                this.setState({redirect: true, isLoading: false})
            }
            else{
                alert(res.message)
                this.setState({isLoading: false})
            }
            this.setState({isLoading: false})
        })
        .catch(err => console.log(err))
    }

    handleName(e){
        this.setState = ({
            name:e.target.value
        })
    }
    handleEmail(e){
        this.setState = ({
            email:e.target.value
        })
    }
    handlePassword(e){
        this.setState = ({
            password:e.target.value
        })
    }
    handleSecret(e){
        this.setState = ({
            secret:e.target.value
        })
    }
  render() {
      if(!this.state.redirect) {
        return (
            <div>
                <Header />
                <div style={{marginTop:'120px'}}>
                    <div class="container my-5" >
                            <div class="row justify-content-center">
                                <div class="col-md-5 col-lg-5 col-xs-5">
                                <div class="card text-center card-form">
                                    <div class="card-body">
                                    <h3 class=""><i class="fa fa-user "></i> Sign Up</h3>
                                    <h6 class="font-weight-light">Sign up with valid credentials</h6>
    
                                    <div class="md-form">
                                    <input type="text" id="name" name="name" class="form-control " placeholder="" required  onChange={this.handleName}/>
                                    <label for="form2" class="active">Name</label>
                                    </div>
    
                                    <div class="md-form">                               
                                    <input type="email" name="email" class="form-control" placeholder="" required id="email"  onChange={this.handleEmail}/>
                                    <label for="form2" class="active">Email</label>
                                    </div>
    
                                    <div class="md-form">                               
                                    <input type="password"  id="password" name="password" class="form-control" placeholder="" required id="password" onChange={this.handlePassword}/>
                                    <label for="form2" class="active">Password</label>
                                    </div>
    
                                    <div class="md-form">                               
                                    <input type="text" id="secret" name="secret" class="form-control" placeholder="" required id="secret"  onChange={this.handleSecret}/>
                                    <label for="form2" class="active">Enter any safe word</label>
                                    </div>
                                    
                                    <button
                                        class="btn btn-indigo btn-block"
                                        onClick={this.handleRegister}
                                        >
                                        <i class="fa fa-sign-in" aria-hidden="true"></i> Register
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
        return <Redirect to="/login" />
      }
    
  }
}
