import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { resolve } from 'path';
import { preserveDirectives } from 'rollup-plugin-preserve-directives';

export default defineConfig(({ command }) => {
  const isLibraryBuild = command === 'build';

  return {
    plugins: [
      react(),
      // Only include library plugins during build
      ...(isLibraryBuild
        ? [
            libInjectCss(),
            dts({
              include: ['src'],
              exclude: [
                'src/**/*.test.ts',
                'src/**/*.test.tsx',
                'src/**/*.stories.tsx',
                'src/dev.tsx',
              ],
              rollupTypes: true,
              insertTypesEntry: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@/components': resolve(__dirname, './src/components'),
        '@/hooks': resolve(__dirname, './src/hooks'),
        '@/utils': resolve(__dirname, './src/utils'),
        '@/types': resolve(__dirname, './src/types'),
        '@/styles': resolve(__dirname, './src/styles'),
      },
    },
    // Only apply library build settings during build command
    ...(isLibraryBuild && {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'MotadataReactLibrary',
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            preserveModules: true,
            preserveModulesRoot: 'src',
            exports: 'named',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') return 'styles.css';
              return assetInfo.name ?? 'assets/[name][extname]';
            },
          },
          plugins: [preserveDirectives()],
        },
        sourcemap: false,
        minify: 'esbuild',
        cssCodeSplit: false,
      },
    }),
  };
});
