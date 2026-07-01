import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    '**/dist',
    '**/.vercel',
    '**/.astro',
    '**/node_modules',
    'apps/api/prisma/**',
    'apps/web/src/env.d.ts', // Astro-generated triple-slash reference file
  ]),

  // Base TypeScript rules for every package.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // React-specific rules only for the web app (islands + admin SPA).
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      // Context/provider files legitimately export a hook alongside the component.
      'react-refresh/only-export-components': 'off',
      // We intentionally set state in a few effects (hydration-safe splash,
      // populating a form from fetched data). Keep as a hint, not an error.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
