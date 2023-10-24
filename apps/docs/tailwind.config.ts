import { sharedConfig, stone } from '@codefixlabs/tailwindcss';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'presets' | 'plugins'> = {
  plugins: [stone],
  presets: [sharedConfig],
};

export default config;
