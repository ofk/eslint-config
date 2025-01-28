import pluginJs from '@eslint/js';
import pluginTs from 'typescript-eslint';

export default function defineConfig() {
  return pluginTs.config(pluginJs.configs.recommended, pluginTs.configs.recommended);
}
