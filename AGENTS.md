# Repository Guidelines

## Project Structure & Module Organization
This repo is an Astro-based personal website.

- `src/pages/`: route entry points (e.g., `index.astro`, `writing/[slug].astro`, `[page].astro`).
- `src/components/`: reusable UI blocks like `PostList.astro` and `Sidebar.astro`.
- `src/layouts/`: shared page shells (`BaseLayout.astro`).
- `src/content/`: Markdown content collections.
  - `src/content/posts/`: long-form writing.
  - `src/content/pages/`: static pages (about, reading, sports, etc.).
  - `src/content/config.ts`: content schema definitions.
- `src/data/`: JSON site metadata.
- `public/`: static assets served as-is.
- `plans/`: project planning notes.

## Build, Test, and Development Commands
- `npm ci`: install dependencies exactly from `package-lock.json`.
- `npm run dev`: start local Astro dev server.
- `npm run build`: create production build in `dist/`.
- `npm run preview`: serve built output locally for validation.

Use Node `18.17.1` (`.nvmrc`, `amplify.yml`):

```bash
nvm use 18.17.1
```

## Coding Style & Naming Conventions
- Use existing style: 2-space indentation and double quotes in TS/Astro files.
- Keep components and layouts in `PascalCase` (`PostList.astro`).
- Use lowercase kebab-case for content filenames and slugs (`new-blog-kaleidoscope-mind.md`).
- Keep content frontmatter aligned with schemas in `src/content/config.ts`.
- Prefer small, focused components and minimal inline logic in templates.

## Testing Guidelines
There is currently no automated test suite configured (no Jest/Vitest setup).

- Validate changes by running `npm run build` and `npm run preview`.
- For content updates, confirm routes render and links resolve.
- If adding tests later, colocate near feature code and document new commands in `package.json`.

## Commit & Pull Request Guidelines
Recent commits are short, imperative, and sometimes scoped (e.g., `[fix] add 404 page + fix redirects`).

- Write concise subject lines in imperative mood ("add", "fix", "update").
- Optional scope tags like `[fix]` or `[update]` are acceptable when helpful.
- PRs should include: purpose, summary of file-level changes, and verification steps.
- Include screenshots for visible UI/layout changes.
- Link related issues/plan items when applicable.

## Deployment & Redirect Notes
- AWS Amplify build rules live in `amplify.yml`.
- Keep redirects in sync when changing page/post slugs to avoid broken legacy URLs.
