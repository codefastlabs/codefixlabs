import { sharedConfig, slate } from '@codefixlabs/tailwindcss';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'presets' | 'plugins'> = {
  plugins: [slate],
  presets: [sharedConfig],
};

export default config;
