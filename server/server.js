// Import required dependencies
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDatabase from './config/db.js';

// Import route handlers
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Initialize Express application
const app = express();

/**
 * Middleware Configuration
 * - express.json(): Parses incoming JSON requests
 * - cors(): Enables Cross-Origin Resource Sharing
 */
app.use(express.json());
app.use(cors());

/**
 * Database Connection
 * Establishes connection to MongoDB using environment variables
 */


/**
 * API Routes Configuration
 * Define the base routes for different API endpoints
 */
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

/**
 * Global Error Handler
 * Catches and processes all errors in the application
 */
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

/**
 * Server Startup Function
 * Initializes the server and handles port conflicts
 */
const startServer = async () => {
  const PORT = 5000;
  
  try {
    // Connect to database before starting server
   
    await connectDatabase();
    // Start the server
    const server = app.listen(PORT, () => {
      
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });

  

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();




