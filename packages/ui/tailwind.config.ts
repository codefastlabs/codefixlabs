import type { Config } from 'tailwindcss';
import { sharedConfig } from '@codefixlabs/tailwindcss';

const config: Pick<Config, 'presets'> = {
  presets: [sharedConfig],
};

export default config;
