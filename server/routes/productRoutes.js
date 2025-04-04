import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getLowStockProducts
} from '../controllers/productController.js';

const router = express.Router();

// Protected routes
router.use(protect);

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.get('/search', searchProducts);
router.get('/low-stock', getLowStockProducts);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router; 