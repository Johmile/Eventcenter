import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css';
import Header from './Components/Layout/header'
//import Footer from './Components/Layout/footer'
import Router from './router'
import './Components/css/MDB-Free/css/bootstrap.min.css'
import './Components/css/MDB-Free/css/mdb.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={Header} />
        <Route component={Router} />
        {/* <Route component={Footer} /> */}
      </div>
    );
  }
}

export default App;
