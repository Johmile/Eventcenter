import React, { Component } from 'react'
import { getSingleUser } from '../api/api'
import Header from '../Layout/header'

export default class userProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:'',
            id:'',
            token:''
        }
    }
    async componentDidMount() {
        const token = await window.localStorage.getItem('token')
        if(token){
            const user = await getSingleUser(this.props.match.params.id)
            this.setState({name:user.name, email: user.email, id:user._id, token:token})
        }
    }
  render() {
    return (
      <div>
          <Header />
        <h1 style={{color:'black', marginTop:'120px'}}>User Profile to be mounted</h1>
        <ul>
            <li>{this.state.name}</li>
            <li>{this.state.email}</li>
        </ul>
      </div>
    )
  }
}
