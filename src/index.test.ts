import type { ESLint } from 'eslint';
import type { ConfigArray } from 'typescript-eslint';

import pluginJs from '@eslint/js';
import pluginVitest from '@vitest/eslint-plugin';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import pluginUnicorn from 'eslint-plugin-unicorn';
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
    unicorn: false,
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

function getPluginConfig(prefix: string, plugin: ESLint.Plugin): ConfigArray {
  const rules: ConfigArray[number]['rules'] = Object.fromEntries(
    Object.keys(plugin.rules ?? {}).map((rule) => [`${prefix}${rule}`, 'off']),
  );
  return [{ rules }];
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

function getConfigPrefixes(options: Parameters<typeof createConfig>[0]): string[] {
  return getRulePrefixes(createConfig(options));
}

function diffRules(a: ConfigArray, b: ConfigArray): string[] {
  return [
    ...new Set(Object.keys(getRules(a))).difference(new Set(Object.keys(getRules(b)))),
  ].toSorted();
}

function diffConfigRules(
  prefix: string,
  plugin: ESLint.Plugin,
  options: Parameters<typeof createConfig>[0],
): string[] {
  const rules = Object.keys(getRules(createConfig(options)));
  const pluginRules = Object.keys(getRules(getPluginConfig(prefix, plugin)));
  return [
    ...new Set(pluginRules).difference(new Set(rules)),
    ...new Set(rules.filter((k) => k.startsWith(prefix))).difference(new Set(pluginRules)),
  ].toSorted();
}

test('load config', () => {
  expect(() => defineConfig()).not.toThrow();
});

test('have the right rule boundaries', () => {
  expect(getConfigPrefixes({ js: {} })).toEqual([]);
  expect(getConfigPrefixes({ ts: {} })).toEqual(['@typescript-eslint/']);
  expect(getConfigPrefixes({ imports: {} })).toEqual(['import/']);
  expect(getConfigPrefixes({ unusedImports: {} })).toEqual(['unused-imports/']);
  expect(getConfigPrefixes({ eslintComments: {} })).toEqual(['@eslint-community/eslint-comments/']);
  expect(getConfigPrefixes({ react: {} })).toEqual([
    'jsx-a11y/',
    'react-hooks/',
    'react-refresh/',
    'react/',
    'tailwindcss/',
  ]);
  expect(getConfigPrefixes({ unicorn: {} })).toEqual(['unicorn/']);
  expect(getConfigPrefixes({ vitest: {} })).toEqual(['vitest/']);
  expect(getConfigPrefixes({ perfectionist: {} })).toEqual(['perfectionist/']);
});

test('define all rules', () => {
  expect(diffRules([pluginJs.configs.all], createConfig({ js: {} }))).toEqual([]);
  expect(diffRules(pluginTs.configs.all, createConfig({ js: {}, ts: {} }))).toEqual([]);
  expect(diffConfigRules('import/', pluginImport, { imports: {} })).toEqual([
    'import/enforce-node-protocol-usage',
    'import/imports-first',
  ]);
  expect(diffConfigRules('unused-imports/', pluginUnusedImports, { unusedImports: {} })).toEqual(
    [],
  );
  expect(diffConfigRules('react/', pluginReact, { react: {} })).toEqual([
    'react/jsx-sort-default-props',
    'react/jsx-space-before-closing',
  ]);
  expect(diffConfigRules('react-hooks/', pluginReactHooks, { react: {} })).toEqual([]);
  expect(diffConfigRules('react-refresh/', pluginReactRefresh, { react: {} })).toEqual([]);
  expect(diffConfigRules('jsx-a11y/', pluginJsxA11y, { react: {} })).toEqual([]);
  expect(diffConfigRules('tailwindcss/', pluginTailwindcss, { react: {} })).toEqual([]);
  expect(diffConfigRules('unicorn/', pluginUnicorn, { unicorn: {} })).toEqual([
    'unicorn/import-index',
    'unicorn/no-array-instanceof',
    'unicorn/no-fn-reference-in-iterator',
    'unicorn/no-reduce',
    'unicorn/no-unsafe-regex',
    'unicorn/prefer-dataset',
    'unicorn/prefer-event-key',
    'unicorn/prefer-exponentiation-operator',
    'unicorn/prefer-flat-map',
    'unicorn/prefer-node-append',
    'unicorn/prefer-node-remove',
    'unicorn/prefer-object-has-own',
    'unicorn/prefer-replace-all',
    'unicorn/prefer-starts-ends-with',
    'unicorn/prefer-text-content',
    'unicorn/prefer-trim-start-end',
    'unicorn/regex-shorthand',
  ]);
  expect(diffConfigRules('vitest/', pluginVitest, { vitest: {} })).toEqual([]);
});
