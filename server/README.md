# Product Catalog Service - Backend Server

This is the backend server for the Product Catalog Service, a RESTful API built with Express.js and MongoDB.

## Features

- RESTful API for product catalog management
- Authentication system with user registration and login
- Product CRUD operations
- MongoDB database integration
- Error handling middleware
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or remote)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Server

### Development Mode

```
npm run dev
```

This starts the server with nodemon, which automatically restarts when file changes are detected.

### Production Mode

```
npm start
```

The server will run on port 5000 by default.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get authentication token

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Documentation

API documentation is available at `http://localhost:5000/api-docs` when the server is running. 
