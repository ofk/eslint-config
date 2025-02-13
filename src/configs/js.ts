import type { ConfigWithExtends } from 'typescript-eslint';

import pluginJs from '@eslint/js';
import confusingBrowserGlobals from 'confusing-browser-globals';
import globalVariables from 'globals';
import pluginTs from 'typescript-eslint';

import { mergeRules } from '../utils';

// see https://eslint.org/docs/latest/rules/
export const jsStrict = mergeRules(
  pluginJs.configs.recommended,
  {
    'no-empty': 'warn', // override recommended in suggestions
    'no-empty-static-block': 'warn', // override recommended in suggestions
    'no-misleading-character-class': ['error', { allowEscape: true }], // override recommended in possible-problems
    'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }], // override recommended in possible-problems
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ], // override recommended in possible-problems
    'valid-typeof': ['error', { requireStringLiterals: true }], // override recommended in possible-problems
  },
  // https://eslint.org/docs/latest/rules/#possible-problems
  {
    'array-callback-return': 'error',
    'no-await-in-loop': 'error',
    'no-cond-assign': 'error',
    'no-constructor-return': 'error',
    'no-duplicate-imports': 'error',
    'no-inner-declarations': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-use-before-define': 'error',
    'no-useless-assignment': 'error',
    'require-atomic-updates': 'error',
  },
  // https://eslint.org/docs/latest/rules/#suggestions
  {
    'accessor-pairs': 'error',
    'arrow-body-style': 'error',
    'block-scoped-var': 'error',
    camelcase: ['error', { ignoreDestructuring: false, properties: 'never' }],
    'capitalized-comments': 'off', // disabled style rules
    'class-methods-use-this': 'error',
    complexity: 'off', // disabled metrics rules
    'consistent-return': 'error',
    'consistent-this': 'error',
    curly: ['error', 'multi-line'],
    'default-case': ['error', { commentPattern: '^no default$' }],
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'func-name-matching': 'error',
    'func-names': ['error', 'as-needed'],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'grouped-accessor-pairs': ['error', 'getBeforeSet'],
    'guard-for-in': 'error',
    'id-denylist': 'off', // disabled style rules
    'id-length': 'off', // disabled style rules
    'id-match': 'off', // disabled style rules
    'init-declarations': 'error',
    'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
    'max-classes-per-file': 'error',
    'max-depth': 'off', // disabled style rules
    'max-lines': 'off', // disabled style rules
    'max-lines-per-function': 'off', // disabled style rules
    'max-nested-callbacks': 'off', // disabled style rules
    'max-params': 'off', // disabled style rules
    'max-statements': 'off', // disabled style rules
    'new-cap': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    'no-continue': 'error',
    'no-div-regex': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-function': 'warn',
    'no-eq-null': 'off', // allow null equals
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'no-implicit-globals': 'off', // disabled for use in esm
    'no-implied-eval': 'error',
    'no-inline-comments': 'off', // allow inline comments
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': 'off', // allow magic numbers
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-object-constructor': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-proto': 'error',
    // see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L65
    'no-restricted-exports': ['error', { restrictedNamedExports: ['default', 'then'] }],
    // see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/variables.js#L19
    'no-restricted-globals': ['error', ...confusingBrowserGlobals],
    'no-restricted-imports': 'off', // allow all imports
    'no-restricted-properties': 'off', // allow all properties
    // see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L333
    'no-restricted-syntax': [
      'error',
      {
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        selector: 'ForInStatement',
      },
      {
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
        selector: 'ForOfStatement',
      },
      {
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        selector: 'LabeledStatement',
      },
      {
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        selector: 'WithStatement',
      },
    ],
    'no-return-assign': ['error', 'always'],
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-ternary': 'off', // allow ternary operators
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'off', // allow undefined as a value
    'no-underscore-dangle': 'off', // allow variable names containing underscores
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'no-warning-comments': 'off', // disabled style rules
    'object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],
    'one-var': ['error', 'never'],
    'operator-assignment': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    // see https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/es6.js#L123
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: { array: true, object: false },
        VariableDeclarator: { array: false, object: true },
      },
      { enforceForRenamedProperties: false },
    ],
    'prefer-exponentiation-operator': 'error',
    'prefer-named-capture-group': 'off', // don't enable new regexp features
    'prefer-numeric-literals': 'error',
    'prefer-object-has-own': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'error',
    'require-await': 'error',
    'require-unicode-regexp': 'off', // don't enable new regexp features
    'sort-imports': 'off', // disabled style rules
    'sort-keys': 'off', // disabled style rules
    'sort-vars': 'off', // disabled style rules
    strict: ['error', 'never'],
    'symbol-description': 'error',
    'vars-on-top': 'error',
    yoda: 'error',
  },
  // https://eslint.org/docs/latest/rules/#layout--formatting
  {
    'unicode-bom': 'error',
  },
);

export function jsGlobals({
  browser = true,
  es2021 = true,
  node = true,
}: {
  browser?: boolean;
  es2021?: boolean;
  node?: boolean;
}) {
  return pluginTs.config({
    languageOptions: {
      globals: {
        ...(es2021 ? globalVariables.es2021 : {}),
        ...(browser ? globalVariables.browser : {}),
        ...(node ? globalVariables.node : {}),
      },
    },
  });
}

export function js({
  globals = {},
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & {
  globals?: false | Parameters<typeof jsGlobals>[0];
}) {
  return pluginTs.config(globals ? jsGlobals(globals) : {}, jsStrict, config);
}
