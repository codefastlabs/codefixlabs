import type { Config } from 'tailwindcss';
import { sharedConfig } from '@codefixlabs/tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [sharedConfig],
};

export default config;
