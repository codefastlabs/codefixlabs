import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/**/*.tsx'],
  esbuildOptions: (option) => {
    option.banner = {
      js: `"use client";`,
    };
  },
  external: ['react'],
  format: ['esm', 'cjs'],
  minify: true,
  sourcemap: true,
  splitting: true,
  ...options,
}));
