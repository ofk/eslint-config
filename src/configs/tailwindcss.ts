import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import pluginTs from 'typescript-eslint';

// see https://github.com/francoismassart/eslint-plugin-tailwindcss?tab=readme-ov-file#supported-rules
export const tailwindcssStrict = pluginTs.config(pluginTailwindcss.configs['flat/recommended']);
