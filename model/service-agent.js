const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')

const agentSchema = new Schema({
  email: {
    type: String,
    unique:true,
    required:String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  phoneNo: {
    type:Number,
    validate(value) {
      if (value.length != 10) {
        throw new Error("Phone number should have only ten numbers");
      }
    },
  },
  
  
  role:{type:String, default:'AGENT'},
  
  tokens:[
    {token:String}
  ]
});

agentSchema.plugin(uniqueValidator)


agentSchema.statics.loginWithEmailAndPassword = async (credential) => {
  try {
    const user = await ServiceAgent.findOne({ email: credential.email });
    if (!user) {
      throw new Error("Loging Error");
    }

    console.log(user);
    const compare = await bcrypt.compare(credential.password, user.password);
    if (!compare) {
      throw new Error("Password is not matched");
    }
  
    return {user};
  } catch (error) {
    return {error:error.message}
  }
    
  };
  
  agentSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
  
    delete userObject.tokens;
    delete userObject.password;
  
    return userObject;
  };
  
  agentSchema.methods.generateToken = async function () {
    const user = this;
  
    try {
      const token = jwt.sign({ id: user._id }, "dinuth", {
        expiresIn: "1h",
      });
      user.tokens = user.tokens.concat({ token });
      await user.save();
      return {token};
    } catch (error) {
      return {error:error.message}
    }
  };
    
    
  const ServiceAgent = mongoose.model("ServiceAgent", agentSchema);
  module.exports = ServiceAgent
