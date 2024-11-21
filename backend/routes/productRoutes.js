const express = require('express');
const Product = require('../models/productModel'); // Import the Product model
const router = express.Router();

// Get All Products or Filter by Category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Read 'category' from query params
    let products;

    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Add New Product
router.post('/', async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

module.exports = router;
