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

  serviceCategory:{type:String},
  sheduleDate:{
    type:Date,
  },
  status:{
    type:String,
    default:"PENDING"
  },
  date:{type:Date},
  time:{type:String},
}
);

module.exports = mongoose.model("Appointment", appointmentSchema);
