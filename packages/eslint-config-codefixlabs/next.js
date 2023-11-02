const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo',
  ].map(require.resolve),
  globals: {
    JSX: true,
    React: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  parserOptions: {
    project,
  },
  rules: {
    curly: ['error', 'all'],
    'import/no-default-export': 'off',
    'newline-before-return': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};
