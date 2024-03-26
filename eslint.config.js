import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'curly': ['error', 'all'],
    'style/function-call-spacing': ['error', 'never'],
    // 'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/multiline-ternary': ['error', 'never'],
    // 'max-statements-per-line': ['error', 2],
    'max-statements-per-line': ['error', { max: 1 }],
    'node/prefer-global/process': 'off',
    'antfu/top-level-function': 'off',
    // 'vue/max-attributes-per-line': ['error', {
    //   singleline: { max: 10 },
    //   multiline: { max: 1 },
    // }],
    // 'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': ['warn', {
      html: {
        void: 'always',
        normal: 'never',
      },
    }],
    // 'vue/block-order': ['error', {
    //   order: ['template', 'script', 'style'],
    // }],
  },
}, {
  ignores: [],
})
