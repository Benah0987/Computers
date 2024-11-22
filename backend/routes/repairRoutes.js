const express = require('express');
const router = express.Router();
const RepairRequest = require('../models/repairRequestModel'); // Import the RepairRequest model

// Submit a Repair Request
router.post('/', async (req, res) => {
  const { customerName, device, issue, urgency, photo } = req.body;

  try {
    const newRepairRequest = new RepairRequest({
      customerName,
      device,
      issue,
      urgency,
      photo, // URL or base64-encoded image
    });

    const savedRequest = await newRepairRequest.save();
    res.status(201).json({ message: 'Repair request submitted successfully', repairRequest: savedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting repair request', error });
  }
});

// View All Repair Requests
router.get('/', async (req, res) => {
  try {
    const repairRequests = await RepairRequest.find(); // Fetch all repair requests
    res.status(200).json(repairRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repair requests', error });
  }
});

// View Single Repair Request
router.get('/:id', async (req, res) => {
  try {
    const repairRequest = await RepairRequest.findById(req.params.id);

    if (!repairRequest) {
      return res.status(404).json({ message: 'Repair request not found' });
    }

    res.status(200).json(repairRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repair request', error });
  }
});

module.exports = router;
