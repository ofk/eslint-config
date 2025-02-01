import type { Linter } from 'eslint';

export function mergeRules(
  config: Linter.Config,
  ...rulesSet: Linter.Config['rules'][]
): Linter.Config {
  return {
    ...config,
    rules: rulesSet.reduce((acc, rules) => ({ ...acc, ...rules }), config.rules),
  };
}

export function mergeRuleOptions(
  rule: Linter.RuleEntry | undefined,
  options: object,
): Linter.RuleEntry | undefined {
  if (Array.isArray(rule)) {
    return [rule[0], { ...rule[1], ...options }];
  }
  if (rule === 'error' || rule === 'warn') {
    return [rule, options];
  }
  return rule;
}
