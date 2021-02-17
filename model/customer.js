const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const customerSchema = new Schema({
  email: {
    type: String,
    required:true,
    unique:true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
    
  },
  password: {
    type: String,
  },
  cName: {
    type: String,
  },
  cAddress: String,
  cPhoneNo: String,

  role: {
    type: String,
    default: "CUSTOMER",
  },
  tokens: [{ token: String }],
});

customerSchema.statics.loginWithEmailAndPassword = async (credential) => {
  try {
    const user = await Customer.findOne({ email: credential.email });
    if (!user) {
      throw new Error("Loging Error");
    }

    console.log(user);
    const compare = await bcrypt.compare(credential.password, user.password);
    if (!compare) {
      throw new Error("Password is not matched");
    }

    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

customerSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

customerSchema.plugin(uniqueValidator)
customerSchema.methods.generateToken = async function () {
  const user = this;

  try {
    const token = jwt.sign({ id: user._id }, "dinuth", {
      expiresIn: "1h",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return { token };
  } catch (error) {
    return { error: error.message };
  }
};
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
