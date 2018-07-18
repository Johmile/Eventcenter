import React, { Component } from 'react'
import '../css/materialize.min.css'
import '../css/MaterialDesign-Webfont-master/css/materialdesignicons.min.css'

export default class  extends Component {
  constructor(){
    super();
    this.state = {
      pic:''
    }
    this.handleView = this.handleView.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleView(e){
    e.preventDefault()
    const data = new FormData();
    data.append('pic', this.state.pic)
    console.log(this.state.pic)
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
    return (
      <div>
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
                    <input type="file" onChange={this.handleChange}/>
            <button onClick={this.handleView} value={this.state.pic}>Submit</button>
        {/* </form> */}

        
      </div>
    )
  }
}
