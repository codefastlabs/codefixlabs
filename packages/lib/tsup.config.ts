import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/**/*.ts'],
  external: ['react'],
  format: ['esm', 'cjs'],
  minify: !options.watch,
  sourcemap: true,
  splitting: false,
  ...options,
}));
