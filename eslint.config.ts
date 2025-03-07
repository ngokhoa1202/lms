import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import nodePlugin from 'eslint-plugin-n';

export default tseslint.config(
  eslint.configs.recommended,
  nodePlugin.configs['flat/recommended-script'],
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      '**/node_modules/*',
      '**/*.mjs',
      '**/*.js',
      '**/.yarn/*'
    ]
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        warnOnUnsupportedTypeScriptVersion: false,
        unstableTsConfig: false
      }
    }
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs
    }
  },
  {
    files: ['**/*.ts']
  },
  {
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'warn',
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/no-confusing-void-expression': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,
      '@typescript-eslint/restrict-plus-operands': [
        'warn', { allowNumberAndString: true }
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 0,
      '@typescript-eslint/no-unnecessary-type-parameters': 0,
      '@stylistic/js/no-extra-semi': 'error',
      'max-len': [
        'warn',
        {
          'code': 120
        }
      ],
      '@stylistic/ts/semi': ['warn', 'always'],
      '@stylistic/ts/member-delimiter-style': ['warn', {
        'multiline': {
          'delimiter': 'comma',
          'requireLast': false
        },
        'singleline': {
          'delimiter': 'comma',
          'requireLast': false
        },
        'overrides': {
          'interface': {
            'singleline': {
              'delimiter': 'semi',
              'requireLast': false
            },
            'multiline': {
              'delimiter': 'semi',
              'requireLast': true
            }
          }
        }
      }],
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'comma-dangle': ['error', 'never'],
      'no-console': 1,
      'no-extra-boolean-cast': 0,
      'indent': ['warn', 2],
      'quotes': ['warn', 'single'],
      'n/no-process-env': 0,
      'n/no-missing-import': 0,
      'n/no-unpublished-import': 0,
      'prefer-const': 'warn'
    }
  }
);
