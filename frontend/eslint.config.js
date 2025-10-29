// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals'; // <-- IMPORT the globals package

export default tseslint.config(
  // =================================================================
  // 1. Global Ignores - THIS IS THE MOST IMPORTANT FIX
  // =================================================================
  {
    // This tells ESLint to completely ignore the Next.js build output
    ignores: [
      "node_modules/",
      "build/",
      "dist/",
      ".next/" // <-- ADD THIS LINE
    ],
  },

  // =================================================================
  // 2. Base Recommended Rules
  // =================================================================
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // =================================================================
  // 3. Configuration for JS Config Files (like next.config.js)
  // =================================================================
  {
    files: ['**/*.js'], // Target only .js files like next.config.js, postcss.config.js
    ...tseslint.configs.disableTypeChecked, // Don't run type-aware rules on JS files
    languageOptions: {
      globals: {
        ...globals.node, // <-- This defines `module`, `require`, etc.
      },
    },
  },

  // =================================================================
  // 4. Configuration for React/TypeScript Source Code
  // =================================================================
  {
    files: ["**/*.{ts,tsx}"], // Target your actual source files
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser, // <-- This defines `window`, `document`, 'self' etc.
        ...globals.node,    // <-- Good to have for Next.js server-side code
      },
    },
    rules: {
      // Use the recommended rules from the react plugin
      ...reactPlugin.configs.recommended.rules,
      // But turn off rules that are not needed with modern React/Next.js
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off"
    },
    settings: {
      react: {
        version: "detect", // Automatically detects the React version
      },
    },
  }
);