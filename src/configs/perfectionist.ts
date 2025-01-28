import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginTs from 'typescript-eslint';

// see https://perfectionist.dev/rules
export const perfectionistStrict = pluginTs.config(
  pluginPerfectionist.configs['recommended-natural'],
);
