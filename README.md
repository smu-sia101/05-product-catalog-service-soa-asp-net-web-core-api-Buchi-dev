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

# Product Catalog Service - Full Stack Application

This is a full-stack application for managing a product catalog, built with a React frontend and Express.js backend.

## Project Structure

The project is organized into two main folders:

- **client/** - React frontend built with Vite and Ant Design
- **server/** - Express.js backend with MongoDB

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or remote)
- npm or yarn package manager

### Setting Up Backend

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```


4. Start the server:
   ```
   npm run dev
   ```
   
   The server will run on http://localhost:5000

### Setting Up Frontend

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   
   The client will run on http://localhost:5173

## Features

- User authentication and authorization
- Product catalog management with CRUD operations
- Responsive UI with Ant Design
- REST API with Express.js
- MongoDB database for data persistence

## Development

For detailed information about each part of the application:

- See [client/README.md](./client/README.md) for frontend details
- See [server/README.md](./server/README.md) for backend details

---
