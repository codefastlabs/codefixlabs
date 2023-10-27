# CodeFix

## Create new app

To create a new app, run the following command:

```sh
cd apps
pnpm create next-app
pnpm add @codefixlabs/hooks@workspace @codefixlabs/tailwindcss@workspace @codefixlabs/tsconfig@workspace @codefixlabs/ui@workspace @codefixlabs/lib@workspace eslint-config-codefixlabs@workspace
pnpm add class-variance-authority zod react-hook-form @hookform/resolvers prisma @prisma/client axios @next-auth/prisma-adapter next-auth tailwind-merge date-fns @faker-js/faker path-to-regexp slugify lucide-react @types/pluralize pluralize
```

Update `package.json`

```diff
{
  "name": "@codefixlabs/airbnb",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
+   "clean": "rm -rf .turbo .next node_modules",
+   "db:generate": "prisma generate",
+   "db:push": "prisma db push --skip-generate",
+   "db:studio": "prisma studio"
  },
  "dependencies": {
    ...
  }
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
+   "baseUrl": "./",
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
+ output   = "client"
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
+  relationMode = "prisma"
}

+ model User {
+  id    Int     @id @default(autoincrement())
+  email String  @unique
+  name  String?
+ }
```

Update `tsconfig.json`

```diff
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      "@/*": ["./src/*"],
    }
  },
  ...
}
```

Create `/src/lib/database/index.ts`

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

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
+   optimizePackageImports: ['@codefixlabs/ui'],
+ },
};

module.exports = nextConfig
```

## Tailwind CSS

In `postcss.config.js`

```diff
module.exports = {
  plugins: {
+  "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

In `tailwind.config.ts`

```diff
+ import { sharedConfig } from "@codefixlabs/tailwindcss";
import type { Config } from "tailwindcss"

const config: Pick<Config, "presets"> = {
+ presets: [sharedConfig],
- content: [
-   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
-   "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
-   "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
- ],
- theme: {
-   extend: {
-     backgroundImage: {
-       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
-       "gradient-conic":
-         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
-     },
-   },
- },
- plugins: [],
}

export default config
```
