import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllCenters } from '../api/api'
import Footer from '../Layout/footer'

export default class eventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers:[],
            token: true
        }
    }
    async componentDidMount() {
        const centers = await getAllCenters()
        this.setState({centers:centers.info})
        if(!this.state.token){
            document.getElementById('butt').style.visibility = 'hidden'
            
        }
    }
  render() {
    return (
      <div>
          <section class="container text-center" style={{marginTop:'120px'}}>
          <h3>Available centers
          </h3>
          <hr class="hr-class" />
        </section>
        <div class="card-deck" style={{marginTop:'20px'}}>
            { this.state.centers ? this.state.centers.map( (center, index) => (
                <div class="col-md-4">
                    <div class="card" style={{marginBottom:'20px'}}>
                        <div class="">
                            <img class="card-img-top "  src={require('../images/capital.jpg')} class="img-fluid" alt=""/>
                        </div>
                        <div class="card-body">    
                                <h4 class="card-title" style={{fontStyle: 'italic',fontFamily: 'Times New Roman'}}><strong> {center.name}</strong></h4>                       
                                <h6 class="card-title"><i class="fa fa-map-marker "></i> {center.address}</h6>
                                <h6 class="card-title">{center.capacity} Capacity</h6>
                                <hr/>
                            <div class="seeButton" id="butt">
                                <Link to={`/center/${center._id}`}>
                                <button class="btn btn-outline-danger" >
                                See Features
                                </button></Link>
                            </div>
                        </div>
                    </div>
            </div>
            )) : (
                <h1> No available center</h1>
            )}
                
        </div>
            <Footer/>

      </div>
    )
  }
}
