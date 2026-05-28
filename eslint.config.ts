import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  formatters: true,
  stylistic: {
    semi: true,
    indent: 2,
  },
  rules: {
    'vue/html-self-closing': ['error'],
    'ts/no-explicit-any': ['error'],
    // 'vue/block-order': ['error', {
    //   order: ['template', 'script', 'style'],
    // }],
  },
  ignores: [
    'node_modules/',
    '.git/',
    'dist/',
    'coverage/',
    '.agents/',
  ],
});
