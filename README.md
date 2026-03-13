# React Pizza Shop

**Live:** [https://pizza-day.andrii-prykhodko.com/](https://pizza-day.andrii-prykhodko.com/)

A single-page pizza ordering app built with React and Vite. Users can browse the menu, add pizzas to a cart, and complete checkout with a validated form. After placing an order, they can look up order details by ID using the search in the header. The app uses Redux for cart and menu state, React Router for navigation, and an external API for menu and order data. It is set up to build and deploy to Cloudflare.

## Features

- **Menu** – List of pizzas from the API with add-to-cart
- **Cart** – Adjust quantities, remove items, proceed to checkout
- **Checkout** – Order form with validation (React Hook Form + Yup)
- **Order tracking** – Look up an order by ID via the header search
- **Order page** – View order details and status

## Tech stack

- React 18, Vite 6
- Redux Toolkit (cart and menu state)
- React Router DOM (routing)
- React Hook Form + Yup (checkout form and validation)
- Cloudflare (build and deploy via Wrangler)

Menu and order data are loaded from an external API (see `src/constants.js` for the base URL).

## Prerequisites

- Node.js 18+
- npm

## Getting started

```bash
# Install dependencies
npm install

# Run development server (default: http://localhost:5173)
npm run dev
```

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build (output in `dist/`) |
| `npm run preview` | Build and run preview with Wrangler |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run lint` | Run ESLint |

## Project structure

- `src/pages/` – Route-level components (Home, Menu, Cart, NewOrder, Order)
- `src/components/` – Reusable UI (ProductCard, CartProduct, forms, inputs)
- `src/redux/` – Store and slices (cart, menu)
- `src/context/` – User info context
- `src/hooks/` – Custom hooks (e.g. `useFetch`)
- `src/constants.js` – API base URL and helpers

## License

This project is licensed under the MIT License. You can use, copy, modify, and distribute it under the terms of that license.
