import { expect, test } from 'vitest';

import defineConfig from '.';

test('load config', () => {
  expect(() => defineConfig()).not.toThrow();
});
