[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vWeu2Z3_)
# 📌 ProductCatalog Service Instructions

## 📚 Overview
The **ProductCatalog Service** is a RESTful API that allows managing a catalog of products. It follows **SOA (Service-Oriented Architecture)** principles and uses **MongoDB** as the database.  

---

## 🛠 Endpoints

| Method  | Endpoint                 | Description                      |
|---------|--------------------------|----------------------------------|
| **GET**  | `/api/products`          | Get all products                |
| **GET**  | `/api/products/{id}`     | Get a single product by ID      |
| **POST** | `/api/products`          | Create a new product            |
| **PUT**  | `/api/products/{id}`     | Update a product                |
| **DELETE** | `/api/products/{id}`  | Delete a product                |

---

## 📂 Product Model
Each **product** will have the following properties:  

| Property    | Type     | Description                          |
|------------|---------|--------------------------------------|
| **Id**      | string  | Unique identifier (MongoDB ObjectId) |
| **Name**    | string  | Product name                         |
| **Price**   | decimal | Price of the product                 |
| **Description** | string  | Brief product description      |
| **Category** | string  | Category of the product             |
| **Stock**   | int     | Available stock quantity            |
| **ImageUrl** | string  | URL of the product image            |

---

## 📌 Requirements
1. **.NET 7+** (for building the API)  
2. **MongoDB** (for storing products)  
3. **Postman** or **Curl** (for testing the API)  

---

## 📂 API Functionalities
- **Retrieve** all products from MongoDB.  
- **Get** a specific product by ID.  
- **Add** a new product.  
- **Update** an existing product.  
- **Delete** a product by ID.  

---

## 🎨 UI Development Instructions
Create a **frontend application** using any framework of your choice (**React, Angular, Vue, or Next.js**). The UI should:
- Consume the **ProductCatalog Service** endpoints.
- Display the list of products with their **image, name, description, price, and stock**.
- Provide a form to **add, update, and delete** products.
- Handle API responses and display error messages appropriately.

---

## 🔹 Additional Notes
- The API uses **MongoDB** for storage instead of SQL databases(mongodb://localhost:27017/).  
- The API follows **RESTful principles**.  
- Responses are returned in **JSON format**.  

---

# Product Catalog Service

A modern full-stack application built with React and Node.js, featuring a product catalog management system.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Static assets (images, fonts, etc.)
│   │   ├── components/    # Reusable React components
│   │   ├── config/        # Configuration files
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── utils/         # Utility functions and helpers
│   └── package.json       # Frontend dependencies
│
└── server/                 # Backend Node.js application
    ├── controllers/       # Request handlers
    ├── middleware/        # Custom middleware functions
    ├── models/           # Database models
    ├── routes/           # API route definitions
    └── package.json      # Backend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd product-catalog-service
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-catalog
JWT_SECRET=your-secret-key
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Code Organization

### Frontend

- **components/**: Reusable UI components
- **pages/**: Main page components
- **context/**: React context for state management
- **services/**: API integration services
- **utils/**: Helper functions and utilities

### Backend

- **controllers/**: Business logic and request handling
- **middleware/**: Custom Express middleware
- **models/**: MongoDB schema definitions
- **routes/**: API endpoint definitions

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use proper naming conventions
   - Implement proper prop validation

2. **State Management**
   - Use React Context for global state
   - Keep state as local as possible
   - Implement proper error handling

3. **API Integration**
   - Centralize API calls in service files
   - Implement proper error handling
   - Use environment variables for configuration

4. **Code Style**
   - Follow consistent naming conventions
   - Use meaningful variable and function names
   - Add proper comments and documentation

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.

---
