import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import './App.css';
import Login from './Components/Pages/login'
import Register from './Components/Pages/register'
import Dashboard from './Components/Pages/dashboard'
import Events from './Components/Pages/View'
//import Header from './Components/Layout/header'

class App extends Component {
  render() {
    return (
      <div className="App">

        <Route path="/" exact={true} component={Dashboard}/>
        <Route path="/register" exact={true} component={Register}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/dash" exact={true} component={Events}/>
      </div>
    );
  }
}

export default App;
