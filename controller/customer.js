const Customer = require("../model/customer");
const Vehicle = require("../model/vehicle");
const Appointment = require("../model/appointment");
const ServiceRecords = require("../model/service-records");
const Payment = require('../model/payment')
const bcrypt = require("bcryptjs");

exports.registor = async (req, res) => {
  const customerData = req.body;

  try {
    const password = await bcrypt.hash(customerData.password, 8);
    const customer = new Customer({
      ...customerData,
      password,
      role: "CUSTOMER",
    });
    const save = await customer.save();
    res.send({ customer: save });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const customerData = req.body;

  try {
    const { user, error } = await Customer.loginWithEmailAndPassword(
      customerData
    );
    if (error) {
      return res.status(500).send({ error });
    }
    const { token, error: tokenError } = await user.generateToken();
    if (tokenError) {
      return res.status(500).send({ error: tokenError });
    }
    res.send({ customer: user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addVehicle = async (req, res) => {
  const vehicleData = req.body;
  const customer = req.customer;
  try {
    const vehicle = new Vehicle({ ...vehicleData, customerId: customer });
    const saved = await vehicle.save();
    res.send({ vehicle: saved });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editVehicle = async (req, res) => {
  const id = req.params.id;
  const customerData = req.body;
  try {
    const editCustomer = await Vehicle.findByIdAndUpdate(
      id,
      { ...customerData },
      { runValidators: true, new: true }
    );

    res.send({ customer: editCustomer });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    res.send({  vehicle, message:"Vehicle deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  const appointmentData = req.body;
  const customerId = req.customer;
  try {
    appointmentData.date = new Date(appointment.date)
    const appointment = new Appointment({ ...appointmentData, customerId });
    const saved = await appointment.save();
    res.send({ appointment: saved });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.showAllAppointments = async(req,res)=>{
  const customerId = req.customer;
  try {
    const appointments = await Appointment.find({customerId})
    res.send({appointments})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.viewServiceRecords = async (req, res) => {
  const id = req.customer;
  try {
    const serviceRecords = await ServiceRecords.find({ customerId: id });
    res.send({ serviceRecords });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.payment = async (req, res) => {
  const customerId = req.customer
  const paymentData = req.body
  try {
    const payment = new Payment({
      ...paymentData, customerId
    })
    const saved = await payment.save()
    res.send({paymet:saved})
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
