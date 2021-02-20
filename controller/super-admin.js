const Customer = require("../model/customer");
const Vehicle = require("../model/vehicle");
const Appointment = require("../model/appointment");
const SuperAdmin = require("../model/super-admin");
const ServiceAgent = require("../model/service-agent");
const ServiceRecord = require("../model/service-records");
const Payment = require("../model/payment");
const bcrypt = require("bcryptjs");

exports.registor = async (req, res) => {
  const adminData = req.body;

  try {
    const password = await bcrypt.hash(adminData.password, 8);
    const admin = new SuperAdmin({ ...adminData, password, role: "ADMIN" });
    const save = await admin.save();
    res.send({ admin: save });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const adminData = req.body;
  console.log(adminData);
  try {
    const { user, error } = await SuperAdmin.loginWithEmailAndPassword(
      adminData
    );
    if (error) {
      return res.status(500).send({ error });
    }
    const { token, error: tokenError } = await user.generateToken();
    if (tokenError) {
      return res.status(500).send({ error: tokenError });
    }
    res.send({ admin: user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  } 
};

exports.addCustomer = async (req, res) => {
  const customerData = req.body
  try {
    const password = await bcrypt.hash(customerData.password, 8)
    const customer = new Customer({...customerData, password})
    const saved = await customer.save()
    res.send({customer:saved})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


exports.showCustomer = async (req, res) => {
  const id = req.params.id
  try {
    const customers = await Customer.findById(id);
    res.send({ customers });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editCustomer = async (req, res) => {
  const id = req.params.id
  const customerData = req.body
  try {
    const customers = await Customer.findByIdAndUpdate(id, {...customerData},
      {runValidators:true, new:true});
    res.send({ customers });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addVehicle = async (req, res) => {
  const vehicleData = req.body
  try {
    const vehicle = new Vehicle({...vehicleData})
    const saved = await vehicle.save()
    res.send({vehicle:saved})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send({ vehicles });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editVehicle = async (req, res) => {
  const id = req.params.id
  const vehicleData = req.body
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(id, {...vehicleData},
      {runValidators:true, new:true});
    res.send({ vehicle: vehicle });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  const id = req.params.id
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    res.send({ message: "Delete vehicle", vehicle });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



exports.getServiceRecords = async (req, res) => {
  try {
    const records = await ServiceRecord.find();
    res.send({ records });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.serviceAgent = async (req, res) => {
  const agentData = req.body;
  try {
    const password = await bcrypt.hash(agentData.password, 8);
    const agent = new ServiceAgent({ ...agentData, password });
    const saved = await agent.save();
    res.send({ agent: saved });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.showAllAgents = async(req,res)=>{
  try {
    const agents = await ServiceAgent.find()
    res.send({ agents})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.editServiceAgent = async (req, res) => {
  const id = req.params.id
  const agentData = req.body;
  let password;

  try {
    if(agentData.id){
       password = await bcrypt.hash(agentData.password, 8);

    }
    const agent = await ServiceAgent.findByIdAndUpdate(id, {...agentData}, {new:true, runValidators:true})
    const saved = await agent.save();
    res.send({ agent: saved });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteServiceAgent = async (req, res) => {
  const id = req.params.id
  try {
    const agent = await ServiceAgent.findByIdAndDelete(id)
    res.send({message:'delete successfully', agent });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



exports.showAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.send({appointments})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.showPayment = async (req, res) => {
  try {
    const payments = await Payment.find()
    res.send({payments})
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

