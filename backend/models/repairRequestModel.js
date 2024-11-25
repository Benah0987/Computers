const mongoose = require('mongoose');

const repairRequestSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  device: { type: String, required: true },
  issue: { type: String, required: true },
  urgency: { type: String, enum: ['low', 'medium', 'high'], required: true },
  photo: { type: String }, // Can be URL or base64 encoded image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RepairRequest', repairRequestSchema);
