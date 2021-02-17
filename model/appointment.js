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
  serviceId:{type:String},
  sheduleDate:{
    type:Date,
    default:Date.now
  },
  status:{
    type:String,
    default:"PENDING"
  }

},{ timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
