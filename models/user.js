const mongoose = require("mongoose");

const User = mongoose.model("Department", {
  account: {
    username: String,
    biography: String
  },
  email: String,
  token: String,
  hash: String,
  salt: String
});

module.exports = User;
