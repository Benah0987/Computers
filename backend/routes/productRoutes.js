const express = require('express');
const Product = require('../models/productModel'); // Import the Product model
const router = express.Router();

// Get All Products or Filter by Category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Read 'category' from query params
    let products;

    if (category) {
      products = await Product.find({ category, isApproved: true }); // Filter by category and approved products
    } else {
      products = await Product.find({ isApproved: true }); // Only fetch approved products
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Get a Single Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.isApproved) {
      return res.status(403).json({ message: 'Product is not approved yet' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// Add New Product
router.post('/', async (req, res) => {
  const { name, price, description, category, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
      isApproved: false, // Default to not approved
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product submitted for approval', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Approve Product (Admin Only)
router.patch('/:id/approve', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isApproved = true;
    await product.save();

    res.status(200).json({ message: 'Product approved successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error approving product', error });
  }
});
// Fetch All Not Approved Products (Admin Only)
router.get('/not-approved', async (req, res) => {
  try {
    const unapprovedProducts = await Product.find({ isApproved: false });

    if (unapprovedProducts.length === 0) {
      return res.status(404).json({ message: 'No unapproved products found' });
    }

    res.status(200).json(unapprovedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unapproved products', error });
  }
});


module.exports = router;
