import React, { Component } from 'react'
import '../css/bootstrap.min.css'

export default class eventView extends Component {
  render() {
    return (
      <div class="jumbotron">
        <div class="row">
            <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <img src="./food3.jpg" />
                    <div class="caption">
                        <h3>Name of center</h3>
                        <ul>
                            <li>capacity</li>
                            <li>Location</li>
                        </ul>
                        <button class="btn btn-primary">
                            More
                        </button>
                        <button class="btn btn-default">
                            Rent
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
