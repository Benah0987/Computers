const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  image: { type: String }, // URL or image path
  isApproved: { type: Boolean, default: false }, // For admin approval
});

module.exports = mongoose.model('Product', productSchema);
