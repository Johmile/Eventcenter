import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import './Components/css/MDB-Free/css/bootstrap.min.css'
import './Components/css/MDB-Free/css/mdb.min.css'

import Login from './Components/Pages/login'
import Register from './Components/Pages/register'
import Dashboard from './Components/Pages/dashboard'
import Centers from './Components/Pages/allCenters'
import center from './Components/Pages/center'
import Booking from './Components/Pages/booking'
import Payment from './Components/Pages/payment'
import Manual from './Components/Pages/manual'
import ErrorPage from './Components/Pages/errorPage'
import UserProfile from './Components/Pages/userProfile'
import PayStack from './Components/Pages/paystack'
import NewCenter from './Components/Pages/newCenter'
import CenterStatus from './Components/Pages/centerStatus'

export default class router extends Component {
  render() {
    return (
      <div>
        <Switch>
            <Route path="/" strict exact={true} component={Dashboard}/>
            <Route path="/centerstatus" strict exact={true} component={CenterStatus}/>
            <Route path="/newcenter" strict exact={true} component={NewCenter}/>
            <Route path="/manual" strict exact={true} component={Manual}/>
            <Route path="/payment" strict exact={true} component={Payment}/>
            <Route path="/register" strict exact={true} component={Register}/>
            <Route path="/login" strict exact={true} component={Login}/>
            <Route path="/center/:id" strict exact={true} component={center}/>
            <Route path="/booking" strict exact={true} component={Booking}/>
            <Route path="/centers" strict exact={true} component={Centers}/>
            <Route path="/profile/:id" strict exact={true} component={UserProfile}/>
            <Route path="/paystack" strict exact={true} component={PayStack}/>
            <Route path="*" strict exact={true} component={ErrorPage}/>
        </Switch>
      </div>
    )
  }
}
