const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
      type: String,
    },
    surnames: {
      type: String,
    },
    email: {
      type: String,
      required: true
    },
    password:{
      type:String,
      required: true
    },
    phone: { 
        type: String 
    },
    city: {
      type: String,
    },
    userRoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole'  
    },
  });
  
  module.exports = mongoose.model("User", UserSchema);
  