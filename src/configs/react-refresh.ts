import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginTs from 'typescript-eslint';

// see https://github.com/ArnaudBarre/eslint-plugin-react-refresh?tab=readme-ov-file#usage
export const reactRefreshStrict = pluginTs.config(pluginReactRefresh.configs.recommended);
