import pluginVitest from '@vitest/eslint-plugin';
import pluginTs, { ConfigWithExtends } from 'typescript-eslint';

// see https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#rules
export const vitestStrict = pluginTs.config(pluginVitest.configs.recommended);

export function vitest(config: Pick<ConfigWithExtends, 'extends' | 'rules'>) {
  return pluginTs.config({
    extends: [vitestStrict, config],
    files: ['tests/**', '*.test.*'],
  });
}
