const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, min: 0 },
  estimatedDuration: { type: Number }, // minutes
  available: { type: Boolean, default: true }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
