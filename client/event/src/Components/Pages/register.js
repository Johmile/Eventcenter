import React, { Component } from 'react'
import '../css/bootstrap.min.css'
import '../css/register.css'
import '../css/MaterialDesign-Webfont-master/css/materialdesignicons.min.css'


export default class register extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            secret:""
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSecret = this.handleSecret.bind(this)
    }
    
    handleRegister(e){
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let secret = document.getElementById('secret').value;
        e.preventDefault();
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
        .then(res => alert(res.message))
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
      
    return (
        <div>
            
        <div className="card-panel" id="register">
        <div className="red reg">
            <h1>Register here</h1>
            </div>
            
            <form method="post">
                <div class="form-group">
                    <label>Name</label>
                    <i class="mdi mdi-account"><input type="text" id="name" name="name" class="form-control " placeholder="Enter your name" required id="name"  onChange={this.handleName}/></i>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <i class="mdi mdi-email"><input type="email" name="email" class="form-control" placeholder="Enter your email" required id="email"  onChange={this.handleEmail}/></i>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <i className="mdi mdi-lock"><input type="password"  id="password" name="password" class="form-control" placeholder="Enter your password" required id="password" onChange={this.handlePassword}/></i>
                </div>
                <div class="form-group">
                    <label>Secret*</label>
                    <i class="mdi mdi-security"><input type="text" id="secret" name="secret" class="form-control" placeholder="Enter any secret value" required id="secret"  onChange={this.handleSecret}/></i>
                </div>
                <button type="submit"  class="btn btn-primary btn-lg active" onClick={this.handleRegister}>Register</button>
            </form>
        </div>
    </div>
    )
  }
}
