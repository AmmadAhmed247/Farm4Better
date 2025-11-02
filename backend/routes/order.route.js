import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/create', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

export default router;