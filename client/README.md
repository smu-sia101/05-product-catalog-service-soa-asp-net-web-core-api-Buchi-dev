# Product Catalog Service - Frontend Client

This is the frontend React application for the Product Catalog Service, built with React, Vite and Ant Design.

## Features

- User authentication (login, register, forgot password)
- Dashboard with product statistics
- Product catalog management interface
- Responsive design using Ant Design components
- Protected routes for authenticated users
- User profile management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running (see server README)

## Installation

1. Clone the repository
2. Navigate to the client directory:
   ```
   cd client
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Development Mode

```
npm run dev
```

This starts the Vite development server at `http://localhost:5173` with hot module replacement.

### Building for Production

```
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```
npm run preview
```

This serves the production build locally for testing.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build

## Project Structure

- `src/components` - Reusable UI components
- `src/pages` - Page components for each route
- `src/context` - React context providers (Auth, etc.)
- `src/utils` - Utility functions
- `src/config` - Configuration files

## Technologies Used

- React 19
- React Router v6
- Ant Design UI Framework
- Axios for API requests
- Vite as build tool
- ESLint for code quality
