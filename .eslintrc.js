module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['./tsconfig.json'],
    // @ts-ignore
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'no-void': 'off',
    'no-empty': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'arrow-body-style': 'off',
    'no-nested-ternary': 'off',
    'no-implicit-coercion': 'off',
    'no-underscore-dangle': ['allowAfterThis'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    // https://stackoverflow.com/a/59268871
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'implicit-arrow-linebreak': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts',  '**/.*.ts'],
      rules: {
        'no-unused-vars': ['off'],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
}
