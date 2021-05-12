const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    surnames: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type:String,
      required: true,
    },
    phone: { 
        type: String,
        required: true, 
    },
    city: {
      type: String,
    },
    userRoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true 
    },
  });
  
  module.exports = mongoose.model("User", UserSchema);
  