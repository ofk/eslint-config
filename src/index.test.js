import { expect, test } from 'vitest';

import defineConfig from './index.mjs';

test('load config', () => {
  expect(() => defineConfig()).not.toThrow();
});
