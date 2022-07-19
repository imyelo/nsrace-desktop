module.exports = {
  root: true,
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    // @ts-ignore
    tsconfigRootDir: __dirname,
  },
  extends: ['@yelo/eslint-config'],
  rules: {
    'no-console': 'off',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
  },
}
