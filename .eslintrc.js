module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['google', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  globals: {
    my: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    getApp: 'readonly'
  },
  rules: {
    camelcase: 'off',
    'new-cap': 'off',
    'no-invalid-this': 'off',
    'no-implicit-globals': 'error',
    'no-undefined': 'error',
    'no-undef': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'require-jsdoc': 'off',
    'prefer-rest-params': 'off',
    'prefer-promise-reject-errors': 'off'
  },
  plugins: ['prettier', 'import']
};
