# Coding Standards & Best Practices

## Table of Contents

1. [General Principles](#general-principles)
2. [CSS Standards](#css-standards)
3. [Vue.js Standards](#vuejs-standards)
4. [TypeScript Standards](#typescript-standards)
5. [File Organization](#file-organization)
6. [Naming Conventions](#naming-conventions)
7. [Performance Guidelines](#performance-guidelines)
8. [Accessibility Standards](#accessibility-standards)

## General Principles

### 1. Clean Code Rules

- **Single Responsibility**: Each function/component should do one thing well
- **DRY (Don't Repeat Yourself)**: Avoid code duplication
- **KISS (Keep It Simple, Stupid)**: Prefer simple solutions over complex ones
- **Consistency**: Follow established patterns throughout the project

### 2. Code Organization

- **Logical Grouping**: Group related code together
- **Clear Separation**: Separate concerns (HTML, CSS, JS)
- **Modular Design**: Break large components into smaller, reusable pieces

## CSS Standards

### 1. CSS Architecture

```css
/* ==========================================================================
   Section Name
   ========================================================================== */

/* Component-specific styles */
.component-name {
  /* Base styles */
}

.component-name__element {
  /* Element styles */
}

.component-name--modifier {
  /* Modifier styles */
}
```

### 2. CSS Variables (Custom Properties)

- **Use CSS variables** for consistent theming
- **Group variables** by purpose (colors, spacing, typography)
- **Prefix variables** appropriately (`--color-`, `--spacing-`, `--font-`)

### 3. Responsive Design Rules

```css
/* Mobile-first approach */
.component {
  /* Base mobile styles */
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
  }
}
```

### 4. RTL Support

- **Always include RTL properties** for Persian language
- **Use logical properties** where possible
- **Test both LTR and RTL layouts**

## Vue.js Standards

### 1. Component Structure

```vue
<template>
  <!-- Template content -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComponentName',
  components: {
    // Component imports
  },
  props: {
    // Props definition
  },
  setup(props, { emit }) {
    // Composition API logic
    return {
      // Return reactive data and methods
    }
  },
})
</script>

<style scoped>
/* Component styles */
</style>
```

### 2. Naming Conventions

- **Components**: PascalCase (`ProductCard.vue`)
- **Files**: kebab-case (`product-card.vue`)
- **Methods**: camelCase (`addToCart`)
- **Props**: camelCase (`productId`)
- **Events**: kebab-case (`add-to-cart`)

### 3. Props Validation

```typescript
props: {
  product: {
    type: Object as PropType<Product>,
    required: true,
    validator: (value: Product) => {
      return value.id && value.name
    }
  }
}
```

## TypeScript Standards

### 1. Type Definitions

- **Create interfaces** for all data structures
- **Use strict typing** for function parameters and return values
- **Avoid `any` type** unless absolutely necessary

### 2. Import/Export Rules

```typescript
// Group imports by type
import { defineComponent, computed } from 'vue' // Vue imports
import type { Product } from '../types/cart-store' // Type imports
import ProductCard from './ProductCard.vue' // Component imports
```

### 3. Error Handling

- **Use try-catch blocks** for async operations
- **Provide meaningful error messages**
- **Handle edge cases** gracefully

## File Organization

### 1. Directory Structure

```
src/
├── components/          # Reusable Vue components
├── views/              # Page-level components
├── store/              # Vuex store modules
├── router/             # Vue Router configuration
├── api/                # API service functions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── assets/             # Static assets
└── styles/             # Global styles
```

### 2. File Naming

- **Components**: `ComponentName.vue`
- **Types**: `component-name.d.ts`
- **Utils**: `component-name.utils.ts`
- **API**: `component-name.api.ts`

## Naming Conventions

### 1. CSS Classes (BEM Methodology)

```css
.block {
} /* Main component */
.block__element {
} /* Component element */
.block--modifier {
} /* Component modifier */
.block__element--modifier {
} /* Element modifier */
```

### 2. Variables and Functions

```typescript
// Variables
const productList = ref([])
const isLoading = ref(false)

// Functions
const fetchProducts = async () => {}
const handleAddToCart = (product: Product) => {}

// Constants
const API_BASE_URL = 'https://api.example.com'
const MAX_ITEMS_PER_PAGE = 20
```

## Performance Guidelines

### 1. Vue.js Performance

- **Use `v-show`** instead of `v-if` for frequently toggled elements
- **Implement `key` attributes** for list rendering
- **Use `computed` properties** for expensive calculations
- **Lazy load** components when possible

### 2. CSS Performance

- **Minimize specificity** conflicts
- **Use CSS variables** for dynamic values
- **Optimize selectors** for better performance
- **Avoid deep nesting** (max 3 levels)

### 3. Bundle Optimization

- **Tree shake** unused code
- **Code split** by routes
- **Optimize images** and assets
- **Use modern build tools**

## Accessibility Standards

### 1. Semantic HTML

- **Use proper heading hierarchy** (h1, h2, h3, etc.)
- **Include alt text** for images
- **Use ARIA labels** where necessary
- **Ensure keyboard navigation** works

### 2. RTL Support

- **Always include RTL properties**
- **Test with Persian text**
- **Use logical properties** (margin-inline, padding-block)
- **Consider text direction** in layouts

### 3. Color and Contrast

- **Maintain WCAG contrast ratios**
- **Don't rely solely on color** for information
- **Test with color blindness simulators**

## Code Review Checklist

### Before Committing

- [ ] Code follows naming conventions
- [ ] No console.log statements in production
- [ ] All TypeScript errors resolved
- [ ] CSS follows BEM methodology
- [ ] Components are properly typed
- [ ] RTL support implemented
- [ ] Responsive design tested
- [ ] Accessibility requirements met
- [ ] Performance considerations applied

### Testing Requirements

- [ ] Components render correctly
- [ ] User interactions work as expected
- [ ] Responsive breakpoints function properly
- [ ] RTL layout displays correctly
- [ ] Error states are handled gracefully
- [ ] Loading states are implemented

## Documentation Standards

### 1. Code Comments

```typescript
/**
 * Fetches products from the API
 * @param page - The page number to fetch
 * @param limit - Number of items per page
 * @returns Promise<Product[]>
 */
const fetchProducts = async (page: number, limit: number): Promise<Product[]> => {
  // Implementation
}
```

### 2. Component Documentation

```vue
<!--
  ProductCard Component
  
  Displays a single product with add to cart functionality.
  
  Props:
  - product: Product - The product data to display
  
  Events:
  - add-to-cart: Emitted when add to cart button is clicked
-->
```

## Version Control

### 1. Commit Messages

```
feat: add product card component
fix: resolve RTL layout issues
docs: update coding standards
refactor: improve component structure
test: add unit tests for ProductCard
```

### 2. Branch Naming

- **Feature branches**: `feature/component-name`
- **Bug fixes**: `fix/issue-description`
- **Hotfixes**: `hotfix/critical-fix`
- **Releases**: `release/version-number`

---

_This document should be updated as the project evolves and new standards are established._
