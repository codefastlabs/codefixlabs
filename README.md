# CodeFix

## Create new app

To create a new app, run the following command:

```sh
cd apps
npx create-next-app --ts --tailwind --eslint --use-pnpm --app --import-alias "@/*" --src-dir "next-movies"
# codefixlabs
pnpm add @codefixlabs/hooks @codefixlabs/tsconfig @codefixlabs/ui @codefixlabs/lib
pnpm add -D @codefixlabs/tailwindcss eslint-config-codefixlabs
# prettier
pnpm add -D prettier-plugin-packagejson prettier-plugin-tailwindcss
# pre-commit
pnpm add -D lint-staged simple-git-hooks
# other
pnpm add class-variance-authority zod react-hook-form @hookform/resolvers @prisma/client @auth/prisma-adapter next-auth@beta tailwind-merge date-fns path-to-regexp slugify lucide-react pluralize
pnpm add -D prisma @types/pluralize @faker-js/faker
```

Update `package.json`

```diff
{
  "name": "next-movies",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
+   "clean": "rm -rf .next node_modules",
+   "db:generate": "prisma generate",
+   "db:push": "prisma db push",
+   "db:studio": "prisma studio",
+   "prettier": "prettier --write --ignore-unknown .",
+   "prettier:check": "prettier --check --ignore-unknown .",
+   "postinstall": "pnpm exec simple-git-hooks",
  },
+ "simple-git-hooks": {
+   "pre-commit": "pnpm exec lint-staged"
+ },
+ "lint-staged": {
+   "*": "prettier --write --ignore-unknown ."
+ },
+ "prettier": {
+   "plugins": [
+     "prettier-plugin-packagejson",
+     "prettier-plugin-tailwindcss"
+   ],
+   "singleQuote": true,
+   "tailwindAttributes": [
+     "classNames"
+   ],
+   "tailwindFunctions": [
+     "cva",
+     "cx",
+     "twMerge"
+   ],
+   "trailingComma": "all"
+ },
  ...
}
```

## TypeScript

Update `tsconfig.json`

```diff
{
+ "extends": "@codefixlabs/tsconfig/nextjs.json",
  "compilerOptions": {
-   "target": "es5",
-   "lib": ["dom", "dom.iterable", "esnext"],
-   "allowJs": true,
-   "skipLibCheck": true,
-   "strict": true,
-   "noEmit": true,
-   "esModuleInterop": true,
-   "module": "esnext",
-   "moduleResolution": "bundler",
-   "resolveJsonModule": true,
-   "isolatedModules": true,
-   "jsx": "preserve",
-   "incremental": true,
+   "declaration": false,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
       "@/*": ["./src/*"]
    }
  },
+ "ts-node": {
+   "transpileOnly": true,
+   "compilerOptions": {
+     "module": "CommonJS",
+     "moduleResolution": "node"
+   }
+ },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## ESLint

Update `.eslintrc.json`

```diff
{
- "extends": "next/core-web-vitals"
+ "extends": ["eslint-config-codefixlabs/next"]
}
```

## Prisma

Initiate Prisma

```sh
pnpx prisma init
```

Update `prisma/schema.prisma`

```diff
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
+  relationMode = "foreignKeys"
}

+ model User {
+  id    Int     @id @default(autoincrement())
+  email String  @unique
+  name  String?
+ }
```

Create `/src/lib/prisma.ts`

```ts
import { PrismaClient } from '@prisma/client/edge';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## Next.js

```diff
/** @type {import('next').NextConfig} */
- const nextConfig = {
+ experimental: {
+   optimizePackageImports: [
+     '@codefixlabs/hooks',
+     '@codefixlabs/lib',
+     '@codefixlabs/ui',
+   ],
+ },
};

module.exports = nextConfig
```

## Tailwind CSS

In `postcss.config.js`

```diff
module.exports = {
  plugins: {
+  'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

In `tailwind.config.ts`

```diff
+ import { sharedConfig } from '@codefixlabs/tailwindcss/tailwind.config';
+ import { stone } from '@codefixlabs/tailwindcss/color/stone';
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'presets' | 'theme' | 'plugins'> = {
+ plugins: [stone],
+ presets: [sharedConfig],
- content: [
-   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
-   "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
-   "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
- ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
- plugins: [],
}

export default config
```
