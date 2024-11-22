const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel'); // Assuming you have a Cart model

// Add Item to Cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

// View Cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// Update Item in Cart
router.patch('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity < 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

// Remove Item from Cart
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
});

// Clear Cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [] },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
});

module.exports = router;
