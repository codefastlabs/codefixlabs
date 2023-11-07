import { sharedConfig } from '@codefixlabs/tailwindcss/tailwind.config';
import { stone } from '@codefixlabs/tailwindcss/color/stone';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'presets' | 'plugins'> = {
  plugins: [stone],
  presets: [sharedConfig],
};

export default config;
