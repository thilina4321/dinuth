const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('validator')

const adminSchema = new Schema({
  email: {
    type: String,
    unique:String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  address: {
    type: String,
  },
  role: { type: String, default:"ADMIN" },
  tokens: [{ token: String }],
});

adminSchema.statics.loginWithEmailAndPassword = async (credential) => {
  try {
    const user = await SuperAdmin.findOne({ email: credential.email });
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

adminSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

adminSchema.methods.generateToken = async function () {
  const user = this;

  try {
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return { token };
  } catch (error) {
    return { error: error.message };
  }
};

const SuperAdmin = mongoose.model("SuperAdmin", adminSchema);
module.exports = SuperAdmin;
