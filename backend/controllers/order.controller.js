import { Order } from '../models/order.model.js';
import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const { deliveryAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        populate: { path: 'farmer' }
      });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate stock availability
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.product.name}`
        });
      }
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 150;
    const total = subtotal + deliveryFee;

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        farmer: item.product.farmer
      })),
      status: 'processing',
      subtotal,
      deliveryFee,
      total,
      delivery: {
        address: deliveryAddress,
        estimatedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        trackingSteps: [
          { status: 'Order Placed', date: new Date().toLocaleString(), completed: true },
          { status: 'Processing', date: new Date().toLocaleString(), completed: true },
          { status: 'Dispatched', date: '', completed: false },
          { status: 'Out for Delivery', date: '', completed: false },
          { status: 'Delivered', date: '', completed: false }
        ]
      },
      paymentMethod: paymentMethod || 'cash'
    });

    // Update product quantities
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { quantity: -item.quantity }
      });
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    // Populate order before sending
    const populatedOrder = await Order.findById(order._id)
      .populate({
        path: 'items.product',
        populate: { path: 'farmer' }
      })
      .populate('user');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: populatedOrder
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = { user: req.user.id };

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    let orders = await Order.find(query)
      .populate({
        path: 'items.product',
        populate: { path: 'farmer' }
      })
      .sort({ createdAt: -1 });

    // Search filter
    if (search) {
      orders = orders.filter(order => 
        order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.items.some(item => 
          item.product?.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    res.json({
      success: true,
      orders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ 
      _id: id, 
      user: req.user.id 
    })
      .populate({
        path: 'items.product',
        populate: { path: 'farmer' }
      })
      .populate('user');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: req.user.id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel ${order.status} order`
      });
    }

    // Restore product quantities
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: item.quantity }
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};