const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  globals: {
    JSX: true,
    React: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  parserOptions: {
    project,
  },
  plugins: ['only-warn'],
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
