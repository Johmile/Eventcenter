const bodyParser = require("body-parser");
const center = require("../models/Center");
const NodeGeocoder = require('node-geocoder');

const options = {
  provider:'google',
  httpAdapter:'https',
  apiKey:process.env.GEOCODER_API_KEY,
  formatter:null
}
const geocoder = NodeGeocoder(options)
//FIND ALL CENTER
exports.getAllCenter = async (req, res) => {
  const centers = await center.find().sort({'_id':-1});
  // if(centers.available == false){
  //   res.json({message:`No available center`})
  // }
  res.json({info:centers});
};

//CREATE NEW CENTER
exports.createNewCenter = async (req, res) => {
  const body = req.body;
  if (!body.name || !body.address || !body.capacity) {
    res.json({
      message: `Please fill in the required inputs`
    });
  } else if (body.name.length > 35 || body.address.length > 35) {
    res.json({
      message: `Name or Address is too long`
    });
  } else {
    // geocoder.geocode(req.body.location, (err, data) => {
    //   if(err || !data.length){
    //     res.json({
    //       message:`invalid address`
    //     })
    //   }
    //   var lat = data[0].latitude
    //   var lng = data[0].longitude
    //   var location = data[0].formattedAddress

    // })
    //const newCenter = await center.create(req.body)
    // newCenter.location = location
    // newCenter.lat = lat
    // newCenter.lng = lng
    // await newCenter.save()
    const newCenter = center.create({
      name:body.name,
      address:body.address,
      capacity:body.capacity,
      price:body.price,
      description:body.description,
      terms:body.terms,
      contact:body.contact,
      price: body.price
      // location:location,
      // lat:lat,
      // lng:lng
    });
    res.json({info:newCenter, message: 'center created successfully'});
  }
};

//FIND A SINGLE CENTER
exports.getSingleCenter = async (req, res) => {
  const singleCenter = await center.findById(req.params.id);
  const available = await singleCenter.available
  let valid_date = await Date.now() + 259200000
  singleCenter.expires = valid_date
  if(available){
    res.json({info:singleCenter})
  }
  else{
      res.json({messsage:`Center is not available for booking now`, info:singleCenter})
    
    
  }
};

//DELETE A CENTER
exports.deleteSingleCenter = (req, res) => {
  center.findOneAndRemove({_id:req.params.id}, (err, center) => {
    if (center) {
      res.json({
        message: `You have successfully delete ${center}`
      });
    } else {
      res.json({
        message: `Sorry,the ID does not exist `
      });
    }
  });
};
//UPDATE A SINGLE CENTER
exports.updateSingleCenter = async (req, res) => {
    const info = await center.findOne({_id: req.params.id})
    if(!info){
      res.json({message:`This center is invalid`})
    }
    else{
      info.available = req.body.available || info.available
      info.price = req.body.price || info.price
      info.capacity = req.body.capacity || info.capacity
      info.name = req.body.name || info.name
      info.description = req.body.description || info.description
      info.capacity = req.body.capacity || info.capacity
      info.address = req.body.address || info.address
      info.terms = req.body.terms || info.terms
      info.paystackurl = req.body.paystackurl || info.paystackurl
      await info.save()
      res.json({message:'you have successfully booked center'})
    }

};
