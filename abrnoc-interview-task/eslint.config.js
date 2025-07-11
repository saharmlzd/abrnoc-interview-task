import pluginVue from 'eslint-plugin-vue'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import vueEslintParser from 'vue-eslint-parser'

export default [
  {
    languageOptions: {
      globals: {
        node: true,
        es2020: true,
      },
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: typescriptEslintParser,
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      vue: pluginVue,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off', // Turn off base rule as it conflicts with TypeScript rule
      'no-console': 'warn',
      'no-debugger': 'warn',
      'max-len': ['error', { code: 100 }],
      'prefer-const': 'error',
      'vue/multi-word-component-names': ['error', { ignores: ['index', 'App'] }],
    },
  },
  {
    files: ['*.vue'],
    rules: {
      'vue/no-unused-vars': 'warn',
    },
  },
]
