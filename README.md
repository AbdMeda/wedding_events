# wedding_events

A wedding events website built with Next.js, React, Tailwind CSS, and Vinext.
The project can be run locally with Vinext and deployed to Vercel with a
standard Next.js production build.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build:vercel
```

This project does not use `wrangler.jsonc`.

## Included Shape

- site routes and page layouts live under `app/`
- shared UI and interactive sections live under `components/`
- production fonts are loaded through `next/font` so Vercel serves them with the build
- `build:vercel` runs the Next.js production build used by Vercel
- `build` verifies the Vinext build output for local/runtime compatibility

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm run build:vercel`: verify the Vercel production build
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
