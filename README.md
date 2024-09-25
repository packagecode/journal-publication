# JMS - React + TypeScript + Vite

This project is built using React with TypeScript and Vite with HMR and ESLint rules.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
- [Technologies Used](#technologies-used)
- [Custom Components](#custom-components)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (version >= 22.2.0) or latest
- npm (version >= 10.7.0) or yarn (version >= 1.22.22)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/sokrio/sokrio-app-frontend.git
   ```

2. Enter the project directory

   ```
   cd sokrio-app-frontend
   ```

## Development

### Install dependencies

```
yarn install
```

### Compiles and hot-reloads for development - This command starts the Vite development server. Open http:localhost::3000 to view it in the browser.

```
yarn dev
```

## Compiles and fixed eslint

```
yarn lint
```

## Building for Production

### Compiles and minifies for production

```
yarn build
```

## Project Structure

Below is a basic outline of the project's main components:

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` lis

## Technologies Used

- [React](https://react.dev/) A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) Adds static types to JavaScript to improve developer productivity and code quality.
- [Vite](https://vitejs.dev/): A fast frontend build tool that provides a streamlined development experience.
- [React Bootstrap](https://react-bootstrap.netlify.app/) The most popular front-end framework, rebuilt for React.
- [Chart.js](https://www.chartjs.org/) Simple yet flexible JavaScript charting library for the modern web
- [Sweetalert](https://sweetalert2.github.io/) A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES
