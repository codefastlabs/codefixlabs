import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => [
  {
    clean: !options.watch,
    dts: true,
    entry: ['src/**/*.tsx', 'src/**/*.ts'],
    external: ['react'],
    format: ['esm', 'cjs'],
    minify: true,
    sourcemap: true,
    splitting: false,
    ...options,
  },
  {
    clean: !options.watch,
    entry: ['src/styles.css'],
    minify: true,
    sourcemap: true,
    splitting: false,
    ...options,
  },
]);
