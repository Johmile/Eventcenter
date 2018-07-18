import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import '../css/bootstrap.min.css'
import '../css/login.css'
import Header from '../Layout/header'


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
            <Header/>
            <div className="card-panel" id="login">
                <form method="post">
                    <h1 className="red">Login here</h1>
                        <div class="form-group">
                            <label>Email</label>
                            <i className ="mdi mdi-account"><input type="email" name="email" class="form-control" placeholder="Enter your email" required id="email" value={this.state.email} onChange={this.validateForm}/></i>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <i className="mdi mdi-lock"><input type="password" name="password" class="form-control" placeholder="Enter your password" required id="password" value={this.state.password} onChange={this.handlePassword}/></i>
                        </div>
                        <Link to="/dash">
                        <button type="submit" class="btn btn-primary btn-lg active" onClick={this.handleSubmit}>Login</button>
                        </Link>
                    </form>
            </div>
      </div>
    )
  }
}
