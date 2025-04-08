import Product from '../models/Product.js';

/**
 * Get all products
 * @returns {Promise<Array>} Array of products
 */
export const getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

/**
 * Create new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(
    id,
    productData,
    { new: true, runValidators: true }
  );
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Deleted product
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

/**
 * Search products
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching products
 */
export const searchProducts = async (query) => {
  return await Product.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

/**
 * Get low stock products
 * @param {number} threshold - Stock threshold
 * @returns {Promise<Array>} Array of low stock products
 */
export const getLowStockProducts = async (threshold) => {
  return await Product.find({ stock: { $lt: threshold } });
}; 