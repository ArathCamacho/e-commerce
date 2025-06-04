const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Hashea la contraseña antes de guardar (mejor con bcrypt)
});

module.exports = mongoose.model('User', userSchema);
