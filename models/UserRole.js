const mongoose = require("mongoose");

const UserRoleSchema = mongoose.Schema({
    name: {
      type: String,
    },
  });
  
  module.exports = mongoose.model("UserRole", UserRoleSchema);