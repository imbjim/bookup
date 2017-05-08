const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String, //added
  city: String, //added
  username: String,
  password: String,
  email: String,// added by Imre
  phone: String,// added by Imre
  province: String,// added by Imre
  country: String,// added by Imre
  age: Number,// added by Imre
  gender: String// added by Imre
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
