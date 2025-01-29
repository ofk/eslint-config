import type { ESLint } from 'eslint';
import type { ConfigArray } from 'typescript-eslint';

import pluginJs from '@eslint/js';
import pluginVitest from '@vitest/eslint-plugin';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import pluginTs from 'typescript-eslint';
import { expect, test } from 'vitest';

import defineConfig from '.';

function createConfig(options: Parameters<typeof defineConfig>[0]) {
  return defineConfig({
    eslintComments: false,
    imports: false,
    js: false,
    perfectionist: false,
    react: false,
    ts: false,
    unusedImports: false,
    vitest: false,
    ...options,
  });
}

function getRules(configArray: ConfigArray): Record<string, string> {
  const rules: Record<string, string> = {};
  configArray.forEach((config) => {
    if (config.rules) {
      Object.entries(config.rules).forEach(([name, rule]) => {
        const level = Array.isArray(rule) ? rule[0] : rule;
        const severity = typeof level === 'number' ? ['off', 'warn', 'error'][level] : level;
        if (severity) {
          rules[name] = severity;
        }
      });
    }
  });
  return rules;
}

function getAllRules(prefix: string, plugin: ESLint.Plugin): ConfigArray[number] {
  return {
    rules: Object.fromEntries(
      Object.keys(plugin.rules ?? {}).map((rule) => [`${prefix}${rule}`, 'off']),
    ),
  };
}

function getRulePrefixes(configArray: ConfigArray): string[] {
  const prefixes = new Set<string>();
  Object.entries(getRules(configArray)).forEach(([name, severity]) => {
    if (severity !== 'off') {
      const prefix = name.replace(/[^/]*$/, '');
      if (prefix) {
        prefixes.add(prefix);
      }
    }
  });
  return [...prefixes].toSorted();
}

function diffRules(a: ConfigArray, b: ConfigArray): string[] {
  return [
    ...new Set(Object.keys(getRules(a))).difference(new Set(Object.keys(getRules(b)))),
  ].toSorted();
}

test('load config', () => {
  expect(() => defineConfig()).not.toThrow();
});

test('have the right rule boundaries', () => {
  expect(getRulePrefixes(createConfig({ js: {} }))).toEqual([]);
  expect(getRulePrefixes(createConfig({ ts: {} }))).toEqual(['@typescript-eslint/']);
  expect(getRulePrefixes(createConfig({ imports: {} }))).toEqual(['import/']);
  expect(getRulePrefixes(createConfig({ unusedImports: {} }))).toEqual(['unused-imports/']);
  expect(getRulePrefixes(createConfig({ eslintComments: {} }))).toEqual([
    '@eslint-community/eslint-comments/',
  ]);
  expect(getRulePrefixes(createConfig({ react: {} }))).toEqual([
    'jsx-a11y/',
    'react-hooks/',
    'react-refresh/',
    'react/',
  ]);
  expect(getRulePrefixes(createConfig({ vitest: {} }))).toEqual(['vitest/']);
  expect(getRulePrefixes(createConfig({ perfectionist: {} }))).toEqual(['perfectionist/']);
});

test('define all rules', () => {
  expect(diffRules([pluginJs.configs.all], createConfig({ js: {} }))).toEqual([]);
  expect(diffRules(pluginTs.configs.all, createConfig({ js: {}, ts: {} }))).toEqual([]);
  expect(diffRules([getAllRules('import/', pluginImport)], createConfig({ imports: {} }))).toEqual(
    [],
  );
  expect(
    diffRules(
      [getAllRules('unused-imports/', pluginUnusedImports)],
      createConfig({ unusedImports: {} }),
    ),
  ).toEqual([]);
  expect(diffRules([getAllRules('react/', pluginReact)], createConfig({ react: {} }))).toEqual([]);
  expect(
    diffRules([getAllRules('react-hooks/', pluginReactHooks)], createConfig({ react: {} })),
  ).toEqual([]);
  expect(
    diffRules([getAllRules('react-refresh/', pluginReactRefresh)], createConfig({ react: {} })),
  ).toEqual([]);
  expect(diffRules([getAllRules('jsx-a11y/', pluginJsxA11y)], createConfig({ react: {} }))).toEqual(
    [],
  );
  expect(diffRules([getAllRules('vitest/', pluginVitest)], createConfig({ vitest: {} }))).toEqual(
    [],
  );
});
