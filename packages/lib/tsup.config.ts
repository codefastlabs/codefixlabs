import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts'],
  external: ['react'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  splitting: true,
  treeshake: true,
  ...options,
}));
