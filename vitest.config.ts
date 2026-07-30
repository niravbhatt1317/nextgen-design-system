import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.storybook', 'storybook-static'],
    css: true,
    // Reporters for Azure DevOps + SonarCloud integration
    reporters: ['default', 'junit', 'vitest-sonar-reporter'],
    outputFile: {
      junit: './junit.xml',
      'vitest-sonar-reporter': './sonar-report.xml',
    },
    coverage: {
      provider: 'v8',
      // Added 'cobertura' for Azure DevOps code coverage
      reporter: ['text', 'text-summary', 'lcov', 'html', 'cobertura'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/**/*.d.ts',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/index.ts',
        'src/**/*.types.ts',
        'src/dev.tsx',
        '**/*.config.{ts,js}',
        '.storybook/**',
        'src/components/Icon/icons/**',
        'src/components/Sidebar/**',
      ],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
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
});
