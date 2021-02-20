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
  },
  status:{
    type:String,
    default:"PENDING"
  },
  date:{type:Date}
}
);

module.exports = mongoose.model("Appointment", appointmentSchema);
