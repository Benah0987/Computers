const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel'); // Import the Order model

// Create an Order
router.post('/', async (req, res) => {
  const { productId, quantity, customerId, address } = req.body;

  try {
    const newOrder = new Order({
      productId,
      quantity,
      customerId,
      address,
      status: 'pending', // Default order status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// View All Orders (Admin or Filter by Customer)
router.get('/', async (req, res) => {
  const { customerId } = req.query; // Optional: filter by customer

  try {
    let orders;

    if (customerId) {
      orders = await Order.find({ customerId });
    } else {
      orders = await Order.find(); // Fetch all orders (admin use case)
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// View Single Order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});

module.exports = router;
