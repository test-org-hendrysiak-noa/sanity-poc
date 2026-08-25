# Next.js + Sanity CMS Starter

A Next.js 16 application with an embedded Sanity Studio, Tailwind CSS v4 styling, and a flexible page-builder with six content blocks.

## Tech Stack

| Package | Version |
|---|---|
| next | 16.x |
| sanity | 6.x |
| next-sanity | 13.x |
| @sanity/image-url | 2.x |
| @portabletext/react | 8.x |
| tailwindcss | 4.x |
| typescript | 5.x |

## Project Structure

```
├── app/
│   ├── layout.tsx              Root layout
│   ├── page.tsx                Homepage (fetches Sanity data)
│   ├── globals.css             Tailwind v4 CSS entry
│   └── studio/[[...tool]]/    Embedded Sanity Studio at /studio
├── components/
│   ├── PageBuilder.tsx         Renders blocks by _type
│   └── blocks/
│       ├── HeroBlock.tsx
│       ├── RichTextBlock.tsx
│       ├── ImageBlock.tsx
│       ├── CTABannerBlock.tsx
│       ├── FeatureCardsBlock.tsx
│       └── QuoteBlock.tsx
├── sanity/
│   ├── env.ts                  Env var helpers
│   ├── client.ts               Sanity client
│   ├── image.ts                Image URL builder
│   └── schemas/
│       ├── index.ts
│       ├── page.ts
│       └── blocks/             One file per block type
├── sanity.config.ts
└── next.config.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Sanity project

Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project, or run:

```bash
npx sanity init
```

### 3. Configure environment variables

Copy the example file and fill in your project details:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=           # optional, for server-side draft fetching
```

### 4. Add CORS origin in Sanity

In [sanity.io/manage](https://www.sanity.io/manage), go to your project → **API** → **CORS Origins** and add:

```
http://localhost:3000
```

### 5. Run the dev server

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

### 6. Create your first page

1. Open the Studio at `/studio`
2. Create a new **Page** document with slug `home`
3. Add blocks from the toolbar
4. Publish — the homepage will update within 60 seconds (ISR)

## Available Blocks

| Block | Fields |
|---|---|
| **Hero** | Headline, subtitle, CTA label + URL |
| **Rich Text** | Portable Text content (h2, h3, paragraph, blockquote) |
| **Image Block** | Image (with hotspot), alt text, caption |
| **CTA Banner** | Title, description, button label + URL |
| **Feature Cards** | Section heading, repeatable cards (icon, title, body) |
| **Quote** | Quote text, author, role/company |

## Deployment

This app deploys to any platform that supports Next.js (Vercel, Netlify, etc.).

Remember to add all environment variables to your hosting platform and add the production URL to Sanity's CORS origins.
