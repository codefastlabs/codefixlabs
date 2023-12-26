import type { Config } from 'tailwindcss';
import { sharedConfig, slate } from '@codefixlabs/tailwindcss';

const config: Pick<Config, 'presets' | 'plugins'> = {
  plugins: [slate],
  presets: [sharedConfig],
};

export default config;
