const Customer = require("../model/customer");
const Vehicle = require("../model/vehicle");
const Appointment = require("../model/appointment");
const ServiceAgent = require("../model/service-agent");
const ServiceRecord = require("../model/service-records");

exports.login = async (req, res) => {
  const customerData = req.body;

  try {
    const { user, error } = await ServiceAgent.loginWithEmailAndPassword(
      customerData
    );
    if (error) {
      return res.status(500).send({ error });
    }
    const { token, error: errorToken } = await user.generateToken();
    if (errorToken) {
      return res.status(500).send({ error: errorToken });
    }
    res.send({ agent: user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.createRecord = async (req, res) => {
  const recordData = req.body;
  try {
    const record = new ServiceRecord({ ...recordData });
    const saved = await record.save();
    res.send({ record: saved });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editRecord = async (req, res) => {
  const recordData = req.body;
  const id = req.params.id;

  try {
    const record = await ServiceRecord.findByIdAndUpdate(
      id,
      {
        ...recordData,
      },
      { runValidators: true, new: true }
    );

    res.send({ record });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const record = await ServiceRecord.findByIdAndDelete(id);
    res.send({ record });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.seeDailyAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find();
    res.send({ appointment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.appointmentStatus = async (req, res) => {
  const {status, id} = req.body;
  if(status){
    status = "APPROVE"
  }else{
    status = "REJECT"
  }
  try {
    const appointment = await Appointment.findByIdAndUpdate(
       id,
      { status }
    );
    res.send({ appointment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.showPastAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({sheduleDate:{$gt : new Date.now()}})
    res.send({appointments})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



// exports.customerVehicle = async(req,res)=>{
//     try {

//     } catch (error) {
// res.status(500).send({error:error.message})
//     }
// }
