const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  
  vehicleId:{
      type:Schema.Types.ObjectId,
      ref:'Vehicle'
  },
  customerId:{
    type:Schema.Types.ObjectId,
    ref:'Customer'
  },
  serviceId:{type:Schema.Types.ObjectId, ref:'ServiceRecord'},
  sheduleDate:{
    type:Date,
    default:Date.now
  }
  
});

module.exports = mongoose.model("Appointment", appointmentSchema);
