const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  pantry: [foodSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
