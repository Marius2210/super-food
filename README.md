# 🍕 Super Food

A food ordering web application built with React and Vite. Users can browse a product catalog filtered by category, add items to a cart, and complete a purchase through a simulated payment gateway — all with light and dark mode support.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)

---

## Features

- **Product catalog** with category filtering (pizza, hamburger, chicken) and real-time search
- **Shopping cart** with add, reduce, delete, and empty actions, persisted across page reloads
- **Checkout flow** with a simulated payment gateway, form validation, loading states, and a 10% random decline to simulate real-world errors
- **Dark / light mode** toggle persisted to localStorage
- **Responsive design** with a collapsible sidebar on mobile

---

## Tech stack

| Tool | Purpose |
|---|---|
| React 18 | UI with hooks and Context API |
| Vite 5 | Bundler and dev server |
| React Router 6 | Client-side routing |
| Toastify JS | Toast notifications |
| SweetAlert2 | Confirmation dialogs |
| Bootstrap Icons | Icon library |

---

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Add your product images to src/assets/img/ (see image filenames below)

# 3. Start the dev server
pnpm run dev
```

### Required image filenames

Place your images in `src/assets/img/` with these exact names, or update the imports in `src/data/products.js`:

```
pizzapepperoni.jpg      fourcheesepizza.jpg
fourseasonspizza.jpg    hawaiianpizza.jpg
hamburger.png           cheesehamburger.jpg
chickenhamburger.jpg    vegetarianhamburger.jpg
friedchicken.jpg        chickenwings.jpg
chickennuggets.jpg      spicyfriedchicken.jpg
```

---

## Project architecture

This project was refactored from vanilla JavaScript to React, moving from DOM manipulation and scattered `localStorage` reads/writes to a component-based architecture with centralized state.

```
src/
├── assets/img/          Product images (bundled by Vite)
├── components/
│   ├── layout/          Layout, Sidebar, MobileHeader
│   ├── products/        ProductCard, ProductGrid, SearchBar
│   └── checkout/        OrderSummary, PaymentForm, PaymentSuccess
├── constants/           Category definitions
├── context/             CartContext, ThemeContext
├── data/                Static product catalog
├── hooks/               useProducts, useFilteredProducts, useCheckout
├── pages/               Home, Cart, Checkout
└── utils/               toast.js, confirmDialog.js, paymentSimulator.js
```

### State management

Global state is handled with React's built-in **Context API + useReducer**, without external libraries like Redux or Zustand. Two contexts cover the entire app:

**`CartContext`** manages the shopping cart. All mutations go through a single `cartReducer` with four action types: `ADD_PRODUCT`, `REDUCE_PRODUCT`, `DELETE_PRODUCT`, and `EMPTY_CART`. A single `useEffect` syncs the cart to `localStorage` whenever it changes, replacing the scattered reads and writes that existed across four functions in the original vanilla JS code.

```js
// Every cart action in the entire app goes through one place
dispatch({ type: "ADD_PRODUCT", payload: product });
dispatch({ type: "REDUCE_PRODUCT", payload: product.id });
dispatch({ type: "DELETE_PRODUCT", payload: product.id });
dispatch({ type: "EMPTY_CART" });
```

**`ThemeContext`** manages light/dark mode. It applies a `dark` class to `<body>` and persists the preference to `localStorage`. CSS then handles the visual switch under `body.dark` — only white and grey backgrounds are overridden; the orange color scheme remains unchanged in both modes.

### Routing

React Router 6 handles navigation between three routes inside a shared `Layout` component:

```
/           → Home    (product catalog)
/cart       → Cart    (shopping cart)
/checkout   → Checkout (payment form)
```

`Layout` owns the mobile menu state and the selected category. It shares the category with the `Home` page via `useOutletContext()`, since `Home` is rendered inside `<Outlet />` and cannot receive props directly from `Layout`.

### Custom hooks

Logic is extracted into custom hooks to keep components focused on rendering:

| Hook | Responsibility |
|---|---|
| `useProducts` | Returns the product list (ready to swap for a real API call) |
| `useFilteredProducts` | Derives a filtered list from products, category, and search with `useMemo` |
| `useCheckout` | Manages form state, field formatting, validation, and payment submission |

### Simulated payment gateway

`utils/paymentSimulator.js` exposes a `simulatePayment()` function that returns a Promise, identical in shape to what a real payment provider SDK would return. It introduces a 2-second delay to simulate network latency and a 10% random decline rate to exercise the error flow. Swapping it for a real provider (Stripe, PayPal, etc.) requires changing only this file.

```js
// Current: simulated
const result = await simulatePayment(formData);

// Future: real provider, same interface from the component's perspective
const result = await stripe.confirmPayment(formData);
```

### Data layer

Products are stored as a static JS array in `src/data/products.js` with images imported as ES modules so Vite can bundle, optimize, and cache-bust them automatically. The `useProducts` hook abstracts the data source behind a consistent `{ products, loading, error }` interface, so migrating to a REST API or GraphQL endpoint in the future requires changes only inside that hook.

### Separation of concerns

Third-party libraries are isolated in `src/utils/` so components never import from them directly:

- `toast.js` wraps Toastify — replacing the library means touching one file
- `confirmDialog.js` wraps SweetAlert2 — same principle
- `paymentSimulator.js` abstracts the payment flow — same principle

---

## Key patterns used

- **Lifting state up** — `Layout` owns `menuOpen` and `category`, passing them down to `Sidebar` and `Home` so sibling components stay in sync through a single source of truth
- **Controlled inputs** — all form fields in the checkout are controlled by React state, enabling real-time formatting (card number grouped as `1234 5678 9012 3456`, expiry auto-formatted as `MM/YY`)
- **Immutable state updates** — the cart reducer always returns new arrays and objects (`map`, `filter`, spread) instead of mutating state directly, which is what allows React to detect changes and re-render efficiently
- **Early returns** — the `Checkout` page uses early returns for the redirect and success states, keeping the JSX flat and readable instead of nesting ternaries
- **Lazy state initialization** — `useReducer(cartReducer, [], getInitialCart)` reads from `localStorage` exactly once on mount, not on every render

---

## Scripts

```bash
pnpm run dev      # Start development server
pnpm run build    # Build for production
pnpm run preview  # Preview the production build locally
```

Project created by Mario Meléndez