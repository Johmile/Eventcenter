import React, { Component } from 'react'
import '../css/error.css'
import { Link } from 'react-router-dom'

export default class errorPage extends Component {
  render() {
    return (
      <div>
          <div id="contains">
                <div id="clouds">
                    <div class="cloud x1"></div>
                    <div class="cloud x1_5"></div>
                    <div class="cloud x2"></div>
                    <div class="cloud x3"></div>
                    <div class="cloud x4"></div>
                    <div class="cloud x5"></div>
                </div>
                <div class='c'>
                    <div class='_404'>404</div>
                    <hr id="errorHr"/>
                    <div class='_1'>THE PAGE</div>
                    <div class='_2'>WAS NOT FOUND</div>
                    <Link to="/" id="errorBut" href='#'>BACK HOME</Link>
                </div>
            </div>

      </div>
    )
  }
}
