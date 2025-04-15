import * as productService from '../services/productService.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await productService.searchProducts(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};

// Get low stock products
export const getLowStockProducts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    const products = await productService.getLowStockProducts(threshold);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock products', error: error.message });
  }
}; 