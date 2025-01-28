import base from './base';
import react from './react';

export default function defineConfig({
  eslintComments: eslintCommentsOptions,
  imports: importsOptions,
  js: jsOptions,
  perfectionist: perfectionistOptions,
  react: reactOptions = {},
  ts: tsOptions,
  unusedImports: unusedImportsOptions,
  vitest: vitestOptions,
  ...config
}: Parameters<typeof base>[0] & { react?: false | Parameters<typeof react>[0] } = {}) {
  return base({
    ...config,
    eslintComments: eslintCommentsOptions,
    extends: [reactOptions ? react(reactOptions) : {}, ...(config.extends ?? [])],
    imports: importsOptions,
    js: jsOptions,
    perfectionist: perfectionistOptions,
    ts: tsOptions,
    unusedImports: unusedImportsOptions,
    vitest: vitestOptions,
  });
}
