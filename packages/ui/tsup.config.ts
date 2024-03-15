import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

const DIST_PATH = './dist';

async function addDirectivesToChunkFiles(distPath = DIST_PATH): Promise<void> {
  try {
    const files = await fs.readdir(distPath);

    for (const file of files) {
      if (
        file.startsWith('chunk-') &&
        (file.endsWith('.mjs') || file.endsWith('.js'))
      ) {
        const filePath = path.join(distPath, file);

        const data = await fs.readFile(filePath, 'utf8');

        const isSkipFile = data.includes('// src/server/');

        if (isSkipFile) {
          // eslint-disable-next-line no-console -- We need to log the result
          console.log(`Directive 'use client'; has been skipped for ${file}`);
          continue;
        }

        const updatedContent = `'use client';\n\n${data}`;

        await fs.writeFile(filePath, updatedContent, 'utf8');

        // eslint-disable-next-line no-console -- We need to log the result
        console.log(`Directive 'use client'; has been added to ${file}`);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console -- We need to log the error
    console.error('Error:', err);
  }
}

export default defineConfig((options: Options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/**/*.tsx'],
  external: ['react'],
  format: ['esm', 'cjs'],
  async onSuccess() {
    await addDirectivesToChunkFiles();
  },
  outDir: DIST_PATH,
  sourcemap: true,
  splitting: true,
  target: 'esnext',
  treeshake: true,
  ...options,
}));
