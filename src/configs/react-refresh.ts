import pluginReactRefresh from 'eslint-plugin-react-refresh';

import { mergeRules } from '../utils';

// see https://github.com/ArnaudBarre/eslint-plugin-react-refresh?tab=readme-ov-file#usage
export const reactRefreshStrict = mergeRules(pluginReactRefresh.configs.vite);
