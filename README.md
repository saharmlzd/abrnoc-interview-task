# 🛒 Vue 3 Shopping Cart Application

## ⚡ Quick Start

```bash
# 1. Go into the project folder
cd abrnoc-interview-task

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4.  Start the mock API server
npm run server
```

---

A modern, feature-rich shopping cart application built with Vue 3, TypeScript, and Vuex. This project demonstrates best practices in Vue.js development with a focus on clean architecture, error handling, and user experience.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse and view products with detailed information
- **Shopping Cart**: Add, remove, and manage cart items with quantity controls
- **Checkout Flow**: Seamless checkout process with payment integration
- **Error Handling**: Comprehensive error boundary system for graceful error handling
- **Responsive Design**: Mobile-first responsive design with Persian RTL support

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Vue 3 Composition API**: Modern Vue.js development patterns
- **Vuex State Management**: Centralized state management for cart and products
- **Vue Router**: Client-side routing with navigation guards
- **Error Boundaries**: Global error handling for network and runtime errors
- **Throttling**: Button click throttling to prevent spam
- **API Integration**: RESTful API integration with timeout handling
- **Testing**: Jest unit tests for utilities and components

## 🏗️ Architecture

### Project Structure
```
src/
├── api/                    # API layer and data fetching
│   ├── index.ts           # Base API configuration
│   ├── useBaseQuery.ts    # Query hook with error handling
│   ├── products.ts        # Product API endpoints
│   └── cart.ts           # Cart API endpoints
├── components/            # Vue components organized by feature
│   ├── common/           # Shared components (Header, ErrorBoundary)
│   ├── features/         # Feature-specific components
│   │   ├── products/     # Product-related components
│   │   ├── cart/         # Cart-related components
│   │   └── payment/      # Payment-related components
│   └── layout/           # Layout components
├── hooks/                # Custom composable hooks
│   ├── useCart.ts        # Cart state management
│   ├── useThrottle.ts    # Throttling utility
│   └── useErrorBoundary.ts # Error boundary hook
├── store/                # Vuex store configuration
│   └── index.ts          # Store setup and modules
├── router/               # Vue Router configuration
│   └── index.ts          # Route definitions
├── utils/                # Utility functions
│   ├── formatters.ts     # Price formatting utilities
│   ├── cart.ts          # Cart calculation utilities
│   └── errorHandler.ts   # Global error handling
├── types/                # TypeScript type definitions
└── styles/               # Global styles and CSS modules
```

### Key Concepts

#### 1. **Feature-Based Organization**
Components are organized by feature rather than type, making the codebase more maintainable and scalable:
- `features/products/` - All product-related components
- `features/cart/` - All cart-related components
- `features/payment/` - All payment-related components

#### 2. **Composition API Pattern**
Uses Vue 3's Composition API for better logic reuse and type safety:
```typescript
// Example: useCart hook
export const useCart = () => {
  const store = useStore()
  const cart = computed(() => store.state.cart)
  const totalCost = computed(() => calculateTotalCost(cart.value))
  
  return { cart, totalCost, addToCart, removeFromCart }
}
```

#### 3. **Error Boundary System**
Comprehensive error handling with Persian language support:
- Global error catching for network failures
- API timeout handling (10-second timeout)
- User-friendly Persian error messages
- Retry functionality for failed operations

#### 4. **State Management**
Vuex store with TypeScript support for cart and product management:
- Centralized cart state
- Product catalog management
- Type-safe actions and mutations

#### 5. **API Layer**
Robust API integration with error handling:
- Base query hook with timeout support
- Network error detection
- Automatic error boundary triggering

## 🌿 Branching Strategy

### Main Branches
- **`main`** - Production-ready code
- **`develop`** - Integration branch for features

### Feature Branches
- **`feature/component-name`** - New components or features
- **`feature/api-integration`** - API-related changes
- **`feature/error-handling`** - Error boundary improvements
- **`feature/testing`** - Test additions and improvements


### Branch Naming Convention
```
feature/user-authentication
bugfix/cart-item-removal
hotfix/api-timeout-issue
```

### Git Workflow
1. **Create feature branch** from `develop`
2. **Develop and test** your changes
3. **Create pull request** to `develop`
4. **Code review** and approval
5. **Merge to develop** after approval
6. **Release to main** when ready

## 🛠️ Development Setup

### Prerequisites
- Node.js (v22 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd abrnoc-interview-task
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file
cp .env.example .env

# Configure API base URL (optional)
VITE_API_BASE_URL=http://localhost:3000
```

4. **Start the development server**
```bash
npm run dev
```

5. **Start the JSON server (API)**
```bash
npm run server
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run server       # Start JSON server for API
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues

# Type checking
npm run type-check   # Run TypeScript type checking
```

## 🧪 Testing

### Unit Tests
Tests are written using Jest and Vue Test Utils:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
tests/
├── unit/
│   ├── utils/           # Utility function tests
│   ├── components/      # Component tests
│   └── hooks/          # Composable hook tests
└── integration/         # Integration tests
```

**Built with ❤️ using Vue 3, TypeScript, and modern web technologies**
