// After this change is applied, this definition will be removed.
// https://github.com/eslint-community/eslint-plugin-eslint-comments/pull/246
declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
  import type { Linter } from 'eslint';

  const rules: {
    recommended: Linter.Config;
  };
  export = rules;
}

// After this PR is released, this definition will be removed.
// https://github.com/import-js/eslint-plugin-import/pull/3097
declare module 'eslint-plugin-import' {
  import type { ESLint, Linter } from 'eslint';

  const plugin: ESLint.Plugin & {
    flatConfigs: {
      recommended: Linter.Config;
      typescript: Linter.Config;
    };
  };
  export = plugin;
}

// After this change is applied, this definition will be removed.
// https://github.com/facebook/react/issues/30119
declare module 'eslint-plugin-react-hooks' {
  import type { ESLint, Linter } from 'eslint';

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config;
    };
  };
  export = plugin;
}
