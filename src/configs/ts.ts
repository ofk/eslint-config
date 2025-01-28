import { Linter } from 'eslint';
import pluginTs, { ConfigWithExtends } from 'typescript-eslint';

// see https://typescript-eslint.io/rules/
export const tsStrict = pluginTs.config(
  pluginTs.configs.strictTypeChecked,
  pluginTs.configs.stylisticTypeChecked,
);

export function ts({
  disableTypeChecked = false,
  parserOptions = {},
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & {
  disableTypeChecked?: boolean;
  parserOptions?: false | Linter.ParserOptions;
}) {
  return pluginTs.config(
    parserOptions
      ? {
          languageOptions: {
            parserOptions: {
              projectService: true,
              ...parserOptions,
            },
          },
        }
      : {},
    tsStrict,
    config,
    disableTypeChecked
      ? {
          extends: [pluginTs.configs.disableTypeChecked],
          files: ['**/*.{js,jsx,mjs,cjs}'],
        }
      : {},
  );
}
