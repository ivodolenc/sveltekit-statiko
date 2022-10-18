module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },

  extends: ['eslint:recommended', 'eslint-config-prettier'],

  ignorePatterns: [
    '.DS_Store',
    'node_modules',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock'
  ]
}
