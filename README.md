# Project Overview

This project is a modern Next.js application styled with Tailwind CSS and equipped with essential integrations for a SaaS platform. The codebase is streamlined for maintainability, performance, and ease of development.

## Features

- Next.js (latest version)
- Tailwind CSS utility-first styling
- Prisma ORM with PostgreSQL
- NextAuth for authentication
- Stripe integration for payments
- MDX for blogging
- Prettier and ESLint for consistent code quality

## Getting Started

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Start the development server**

    ```bash
    npm run dev
    ```

3. **Build for production**

    ```bash
    npm run build
    ```

## Project Structure

- `src/` — Main source code (pages, components, etc.)
- `prisma/` — Prisma database files
- `data/` — Data assets
- `public/` — Static files (if present)
- `scripts/` — Automation scripts
- `tailwind.config.ts` — Tailwind CSS config
- `postcss.config.js` — PostCSS config

## Troubleshooting

- Ensure Node.js v18+ is installed.
- If Tailwind CSS styles are missing, verify `tailwind.config.ts` and `postcss.config.js`.
- For issues with peer dependencies, try installing with `--legacy-peer-deps`.

## Deployment

You can deploy via [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/) for free. Both support Next.js projects out of the box.

## License

MIT — Free for personal and commercial use.