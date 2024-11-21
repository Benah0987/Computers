const express = require('express');
const router = express.Router();

// Submit a Repair Request
router.post('/', (req, res) => {
  const { customerName, device, issue } = req.body;
  // Logic to handle repair request
  res.send(`Repair request submitted for: ${device}`);
});

// View Repair Requests
router.get('/', (req, res) => {
  // Logic to fetch all repair requests
  res.send('List of repair requests');
});

module.exports = router;
