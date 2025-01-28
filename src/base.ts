import pluginTs, { ConfigWithExtends } from 'typescript-eslint';

import {
  eslintCommentsStrict,
  imports,
  js,
  perfectionistStrict,
  ts,
  unusedImportsStrict,
  vitest,
} from './configs';

export default function defineBaseConfig({
  eslintComments: eslintCommentsOptions = {},
  ignores,
  imports: importsOptions = {},
  js: jsOptions = {},
  perfectionist: perfectionistOptions = {},
  settings,
  ts: tsOptions = {},
  unusedImports: unusedImportsOptions = {},
  vitest: vitestOptions = {},
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'ignores' | 'rules' | 'settings'> & {
  eslintComments?: false | {};
  imports?: false | Parameters<typeof imports>[0];
  js?: false | Parameters<typeof js>[0];
  perfectionist?: false | {};
  ts?: false | Parameters<typeof ts>[0];
  unusedImports?: false | {};
  vitest?: false | Parameters<typeof vitest>[0];
} = {}) {
  return pluginTs.config(
    settings ? { settings } : {},
    ignores ? { ignores } : {},
    jsOptions ? js(jsOptions) : {},
    tsOptions ? ts(tsOptions) : {},
    importsOptions ? imports({ typescript: Boolean(tsOptions), ...importsOptions }) : {},
    unusedImportsOptions ? unusedImportsStrict : {},
    eslintCommentsOptions ? eslintCommentsStrict : {},
    vitestOptions ? vitest(vitestOptions) : {},
    perfectionistOptions ? perfectionistStrict : {},
    config,
  );
}
