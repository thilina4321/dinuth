const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceRecords = new Schema({
  customerId:{
      type:Schema.Types.ObjectId,
      ref:'Customer'
  },
  vehicleId:{
      type:Schema.Types.ObjectId,
      ref:'Vehicle'
  },
  serviceCategory:String,
  serviceDate:{
    type:String,
  },
  amount:{type:Number}
},{timestamps:true});

module.exports = mongoose.model("ServiceRecord", serviceRecords);
