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
    type:Date,
    default:Date.now()
  },
  amount:{type:Number}
});

module.exports = mongoose.model("ServiceRecord", serviceRecords);
