import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
  // 忽略文件
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '*.config.js',
      '*.config.ts',
      'auto-imports.d.ts',
      'pnpm-lock.yaml'
    ]
  },

  // 基础配置
  js.configs.recommended,

  // TypeScript 配置
  ...tseslint.configs.recommended,

  // Vue 配置
  ...vue.configs['flat/recommended'],

  // Prettier 配置
  prettier,

  // 覆盖配置
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      globals: {
        browser: 'readonly',
        node: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      // Prettier
      'prettier/prettier': 'warn',

      // TypeScript 规则
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      // 导入规则（暂时禁用，等待 eslint-plugin-import 支持 ESLint 10.x）
      // 'import/extensions': [
      //   'error',
      //   'ignorePackages',
      //   {
      //     js: 'never',
      //     jsx: 'never',
      //     ts: 'never',
      //     tsx: 'never'
      //   }
      // ],
      // 'import/no-unresolved': 'off',
      // 'import/no-extraneous-dependencies': 'off',
      // 'import/order': ['warn', {
      //   groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      //   'newlines-between': 'always'
      // }],

      // 其他规则
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-param-reassign': 'off',
      'prefer-regex-literals': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-underscore-dangle': 'off',

      // 缩进规则
      indent: ['warn', 2, {
        SwitchCase: 1,
        VariableDeclarator: 'first',
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 'first' },
        FunctionExpression: { parameters: 'first' },
        CallExpression: { arguments: 'first' },
        ArrayExpression: 'first',
        ObjectExpression: 'first',
        ImportDeclaration: 'first',
        flatTernaryExpressions: false,
        offsetTernaryExpressions: true
      }]
    }
  },

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      },
      globals: {
        browser: 'readonly',
        node: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      // Prettier
      'prettier/prettier': 'warn',

      // Vue 规则调整
      'vue/require-default-prop': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/no-v-text': 'warn',
      'vue/no-v-html': 'off',
      'vue/padding-line-between-blocks': 'warn',
      'vue/require-direct-export': 'warn',
      'vue/multi-word-component-names': 'off',

      // TypeScript 规则
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      // 导入规则（暂时禁用，等待 eslint-plugin-import 支持 ESLint 10.x）
      // 'import/extensions': [
      //   'error',
      //   'ignorePackages',
      //   {
      //     js: 'never',
      //     jsx: 'never',
      //     ts: 'never',
      //     tsx: 'never'
      //   }
      // ],
      // 'import/no-unresolved': 'off',
      // 'import/no-extraneous-dependencies': 'off',
      // 'import/order': ['warn', {
      //   groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      //   'newlines-between': 'always'
      // }],

      // 其他规则
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-param-reassign': 'off',
      'prefer-regex-literals': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-underscore-dangle': 'off',

      // 缩进规则
      'vue/html-indent': ['warn', 2],
      'vue/script-indent': ['warn', 2, {
        baseIndent: 0,
        switchCase: 1,
        ignores: []
      }]
    }
  }
];
