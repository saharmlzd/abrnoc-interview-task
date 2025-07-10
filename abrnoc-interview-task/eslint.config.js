import pluginVue from 'eslint-plugin-vue'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import vueEslintParser from 'vue-eslint-parser'

export default [
  {
    languageOptions: {
      globals: {
        node: true,
        es2020: true,
      },
      parser: vueEslintParser, // Correctly using vue-eslint-parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin, // TypeScript plugin
      vue: pluginVue, // Vue plugin for ESLint
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'max-len': ['error', { code: 100 }],
      'prefer-const': 'error',
      // Removed 'vue/script-setup-uses-vars' temporarily
      'vue/multi-word-component-names': ['error', { ignores: ['index', 'App'] }],
    },
  },
  {
    files: ['*.vue'],
    rules: {
      'vue/no-unused-vars': 'warn', // Ensure no unused variables in Vue components
    },
  },
]
