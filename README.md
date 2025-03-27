# @ofk/eslint-config

[![npm](https://img.shields.io/npm/v/@ofk/eslint-config)](https://npmjs.com/package/@ofk/eslint-config)
![ci](https://github.com/ofk/eslint-config/actions/workflows/ci.yml/badge.svg)

@ofk/eslint-config is an eslint config that enables **more rules than recommended**.
This is the base for [@ofk/eslint-config-recommend](https://npmjs.com/package/@ofk/eslint-config-recommend).

## Install

```sh
npm install --save-dev @ofk/eslint-config
npm install --save-dev $(npm info @ofk/eslint-config peerDependencies --json | jq -r 'to_entries | map("\(.key)@\(.value)") | join(" ")')
```

or

```sh
npx install-peerdeps --dev @ofk/eslint-config
```

## Setup

```js
// eslint.config.js
import config from '@ofk/eslint-config';

export default config();
```

You can customize it. For example:

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
