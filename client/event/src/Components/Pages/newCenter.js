import React, { Component } from 'react'
import Header from '../Layout/header'
import Footer from '../Layout/footer'
import { createNewCenter, uploadImage } from '../api/api'
import axios from 'axios'

export default class newCenter extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            address:'',
            location:'',
            price:'',
            paystackurl:'',
            terms:'',
            description:'',
            contact:'',
            photo:''
        }
    }
    async handleSubmit(e){
        e.preventDefault()
        const formdata = new FormData();
          formdata.append('photo', this.state.photo)
          formdata.append('name', this.state.name)
          formdata.append('capacity', this.state.capacity)
          formdata.append('address', this.state.address)
          formdata.append('price', this.state.price)
          formdata.append('terms', this.state.terms)
          formdata.append('paystackurl', this.state.paystackurl)
          formdata.append('contact', this.state.contact)
          formdata.append('description', this.state.description)
          formdata.append('location', this.state.location)
          axios.post('http://localhost:1000/centers', formdata)
          .then( res => {
              alert(res.data.message)
          })
          .catch( err => console.log(err))
        // fetch('http://localhost:1000/centers',  {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: this.state.name,
        //         address:this.state.address,
        //         terms: this.state.terms,
        //         description: this.state.description,
        //         contact: this.state.contact,
        //         price: this.state.price,
        //         location: this.state.location,
        //         paystackurl: this.state.paystackurl,
        //         capacity: this.state.capacity
        //     })
        // })
        // .then( res => res.json())
        // .then( res => {
        //     // console.log(res)
        //     alert(res.message)
        // })
        // .catch( err => console.log(err))
    }
    handleImage(e){
            this.setState({photo:e.target.files[0]})
    }
    handleName(e){
        this.setState({name: e.target.value})
    }
    handleAddress(e){
        this.setState({address: e.target.value})
    }
    handlePrice(e){
        this.setState({price: e.target.value})
    }
    handleLocation(e){
        this.setState({location: e.target.value})
    }
    handleTerms(e){
        this.setState({terms: e.target.value})
    }
    handleDescription(e){
        this.setState({description: e.target.value})
    }
    handlePaystackUrl(e){
        this.setState({paystackurl: e.target.value})
    }
    handleContact(e){
        this.setState({contact: e.target.value})
    }
    handleCapacity(e){
        this.setState({capacity: e.target.value})
    }
  render() {
    return (
      <div>
          <Header/>
        <div class="container my-5" >
          <div class="row justify-content-center">
            <div class="col-md-9 col-lg-9 col-xs-9">
                  
                    <form class="border border-light p-5" style={{marginTop:'40px', marginBottom:'20px'}} encType="multipart/form-data">

            

                        <p class="text-center h4 mb-4">Create new center</p>
                        <hr/>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label>Center name:</label>
                                <input type="text" class="form-control" placeholder="" required
                                value={this.state.name}
                                onChange={this.handleName.bind(this)}/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control" placeholder="" required value={this.state.address} onChange={this.handleAddress.bind(this)}/>
                        </div>

                        <div class="form-group">
                            <label>Capacity</label>
                            <input type="number" class="form-control" placeholder="" required value={this.state.capacity} onChange={this.handleCapacity.bind(this)}/>
                        </div>

                        <div class="form-group">
                            <label>Geo-Location</label>
                            <input type="text" class="form-control" placeholder="" required value={this.state.location} onChange={this.handleLocation.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <label>Price</label>
                            <input type="text" class="form-control" placeholder="" required value={this.state.price} onChange={this.handlePrice.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <label>Contact</label>
                            <input type="phone" class="form-control" placeholder="" required value={this.state.contact} onChange={this.handleContact.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <label>Paystack url</label>
                            <input type="url" class="form-control" placeholder="" required value={this.state.paystackurl} onChange={this.handlePaystackUrl.bind(this)}/>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="8" placeholder="Terms and conditions" required value={this.state.terms} onChange={this.handleTerms.bind(this)} ></textarea>
                        </div>

                        <div class="form-group">
                            <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="8" placeholder="descriptions" required value={this.state.description} onChange={this.handleDescription.bind(this)}></textarea>
                        </div>

                        <div class="upload-img" class="text-center">
                        <div class="row justify-content-center">
                            <div class="col-12">
                            <p  class="text-center"><label>
                                <span class="h2">
                                <i class="fa fa-camera" aria-hidden="true"></i>
                                </span>
                                <br/><input type="file" style={{display:'none'}} onChange={this.handleImage.bind(this)}/> Click to upload image <i class="fa fa-upload-o" aria-hidden="true"></i>
                            </label></p>
                            </div>
                        </div>
                        </div>
                            <hr/>
                            <h1 style={{color:'black'}}>Center facilities</h1>
                            <div className="form-group row">
                                <div className="col-sm-4">
                                <label>Lighting</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label>Sound system</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label>Rest Room</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-4">
                                <label>Parking space</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label>Ventilation</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Fan only</option>
                                        <option>Air conditioner only</option>
                                        <option>Fan & Ac</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label>Security</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Available</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-4">
                                <label>Chair</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Available</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label>Table</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Available</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label>Dressing room</label>
                                    <select class="form-control" id="sel1">
                                        <option>--Select--</option>
                                        <option>None</option>
                                        <option>Available</option>
                                    </select>
                                </div>
                            </div>
                        <div class="text-center">
                        <button 
                        class="btn btn-success"
                        type="submit"
                        onClick={this.handleSubmit.bind(this)} ><i class="fa fa-plus-circle" aria-hidden="true"></i> Post</button>    </div>  
                    </form>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
