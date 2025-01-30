# @ofk/eslint-config

@ofk/eslint-config is an eslint config that enables more rules than recommended.

## Install

```sh
npm install --save-dev @ofk/eslint-config
npx install-peerdeps --dev @ofk/eslint-config
```

## Setup

```js
// eslint.config.js
import config from '@ofk/eslint-config';

export default config();
```

Customization is possible.

```js
import config from '@ofk/eslint-config';
import configPrettier from 'eslint-config-prettier';

export default config({
  extends: [configPrettier],
  ignores: ['dist/'],
  imports: {
    defaultExportFiles: ['src/routes/**'],
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  ts: {
    strict: false,
  },
});
```
