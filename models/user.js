const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  date: { type: Date, default: Date.now },
  phone: { type: String },
});

mongoose.model('users', userSchema);
