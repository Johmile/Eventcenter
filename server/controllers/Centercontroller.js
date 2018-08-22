const bodyParser = require("body-parser");
const center = require("../models/Center");

//FIND ALL CENTER
exports.getAllCenter = async (req, res) => {
  const centers = await center.find();
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
    const newCenter = await center.create(req.body);
    res.json({info:newCenter});
  }
};

//FIND A SINGLE USER
exports.getSingleCenter = async (req, res) => {
  const singleCenter = await center.findById(req.params.id);
  const available = await singleCenter.available
  if(available){
    res.json({info:singleCenter})
  }
  else{
    res.json({message:`Center is not available for booking now`})
  }
};

//DELETE A CENTER
exports.deleteSingleCenter = (req, res) => {
  center.findByIdAndRemove(req.params.id, (err, center) => {
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
exports.updateSingleCenter = (req, res) => {
  center.findByIdAndUpdate(req.params.id, {available:req.body.available}, {new:true}, (err, center) => {
    if (center) {
      res.json({
        message: `status changed successfully`
      });
    } else {
      res.json({
        message: `ID does not exist`
      });
    }
  });
};
