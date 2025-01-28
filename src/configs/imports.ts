import pluginImport from 'eslint-plugin-import';
import pluginTs, { ConfigWithExtends } from 'typescript-eslint';

// see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#rules
export const importsStrict = pluginTs.config(pluginImport.flatConfigs.recommended);

export function imports({
  typescript = false,
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & { typescript?: boolean }) {
  return pluginTs.config(
    importsStrict,
    config,
    typescript
      ? {
          extends: [pluginImport.flatConfigs.typescript],
          files: ['**/*.{ts,tsx,mts,cts}'],
          rules: {
            'import/no-unresolved': 'off',
          },
        }
      : {},
  );
}
