import React, { Component } from 'react'
import '../css/materialize.min.css'
import '../css/MaterialDesign-Webfont-master/css/materialdesignicons.min.css'
import axios from 'axios'

export default class  extends Component {
  constructor(){
    super();
    this.state = {
      pic:'',
      msg:''
    }
    this.handleView = this.handleView.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleView(e){
    e.preventDefault()
    const data = new FormData();
    data.append('pic', this.state.pic, this.state.pic.name)
    
    axios.post('/upload',data,{
      headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          }
    })
    .then(res => {
      //console.log(res.data.message)
       this.setState({msg:res.data.message.pic})
    })
    .catch(err => console.log(err))
    // fetch('/upload',
    // {
    //   method:'POST',
    //   headers:{
    //     'Accept':'application/json',
    //     'Content-Type':'application/form-data'
    //   },
    //   body: data

    // })
    //  //.then(res => console.log(res))
    // .then(res => res.json())
    // .then(res => {
    //   console.log(res.message)
    // })
    // .catch(err => console.log(err))
  }
  handleChange(e){
    //console.log(e.target.files[0])
    this.setState({pic:e.target.files[0]})
  }
  render() {
    const {msg} = this.state
    return (
      <div>
        <p>{msg}</p>
        <img src={msg}/>
        {/* <form method="post" encType="multipart/form-data"> */}
            {/* <div className="file-field input-field">
              <div className="btn">
                <span>file</span>
                <input type="file"/>
              </div>
              <div className="file-path-wrapper">
                <input type="text" name="photo"/>
              </div>
            </div> */}
            <label>
                choose a file
                    <input type="file" onChange={this.handleChange} style={{display:'none'}}/>
            </label>
            <button onClick={this.handleView} >Submit</button>
        {/* </form> */}

        
      </div>
    )
  }
}
