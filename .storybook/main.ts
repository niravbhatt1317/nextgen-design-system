import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { resolve, dirname } from 'path';
import istanbul from 'vite-plugin-istanbul';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-coverage',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  viteFinal: (config) => {
    config.resolve ??= {};
    const currentAlias = config.resolve.alias as Record<string, string> | undefined;
    config.resolve.alias = {
      ...(currentAlias ?? {}),
      '@': resolve(__dirname, '../src'),
      '@/components': resolve(__dirname, '../src/components'),
      '@/hooks': resolve(__dirname, '../src/hooks'),
      '@/utils': resolve(__dirname, '../src/utils'),
      '@/types': resolve(__dirname, '../src/types'),
      '@/styles': resolve(__dirname, '../src/styles'),
    };

    // Remove vite-plugin-dts from Storybook build (not needed for Storybook)
    config.plugins =
      config.plugins?.filter((plugin) => {
        if (plugin && typeof plugin === 'object' && 'name' in plugin) {
          return plugin.name !== 'vite:dts';
        }
        return true;
      }) ?? [];

    // Add istanbul plugin for coverage instrumentation
    config.plugins.push(
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'test/', '**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
        extension: ['.ts', '.tsx'],
        requireEnv: false,
      })
    );

    return config;
  },
};

export default config;
