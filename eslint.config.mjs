import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

import pluginJs from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  pluginJs.configs.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['dist/**/*'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores: ['dist/**/*'],
    ...reactRecommended,
    settings: {
      version: 'detect',
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      'simple-import-sort': simpleImportSort,
      prettier: prettier,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^\\w', '^@hookform', '^@radix-ui'],
            // npm packages
            // Anything that starts with a letter (or digit or underscore), or `@` followed by a letter.
            // ['^\\w'],
            // Internal packages.
            ['^@store(/.*|$)'],
            ['^@components(/.*|$)'],
            ['^@ui(/.*|$)'],
            ['^@lib(/.*|$)'],
            ['^@pages(/.*|$)'],
            ['^@utils(/.*|$)'],
            ['^@hooks(/.*|$)'],
            ['^@services(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];
