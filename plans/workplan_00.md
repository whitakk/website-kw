**Plan to Rebuild the Site (Astro, static, low maintenance)**

**Inputs and Assumptions**
- [ ] Content source: `plans/gatsby_content` (Markdown already prepared)
- [ ] Visual reference: `plans/style_imgs` (vibe reference only)
- [ ] Decisions locked: Astro, redirects OK, no RSS, outbound publication links only

---

**1) Discovery and Inventory**
- [ ] Inventory current routes/paths from existing site (explicit first step)
- [ ] List all Markdown pages/posts in `plans/gatsby_content`
- [ ] Identify any images/PDFs referenced by content
- [ ] Capture key layout cues from `plans/style_imgs` (sidebar, typography, spacing, tone)

Deliverable:
- [ ] A route inventory table to feed the redirect map

---

**2) Framework Choice (Astro)**
- [ ] Use Astro static build for minimal JS and stability
- [ ] Keep dependencies minimal (no CMS, no heavy UI libs)

Why Astro over others:
- Gatsby: higher fragility and plugin churn
- Next static export: heavier framework for simple static needs
- 11ty: great, but fewer built-in component patterns
- Hugo: great but requires Go templating workflow
- Astro: clean component model + Markdown/MDX, static-first

---

**3) Target Architecture**
Checklist:
- [x] Define directory structure
- [x] Define content model (pages vs posts)
- [x] Define frontmatter schema
- [x] Define core components
- [x] Styling approach (plain CSS, minimal deps)
- [x] Handling of outbound publications

Example file tree:
```text
./
|-- src/
|   |-- content/
|   |   |-- pages/
|   |   `-- posts/
|   |-- data/
|   |-- components/
|   |-- layouts/
|   |-- pages/
|   `-- styles/
`-- public/
    |-- images/
    `-- favicon/
```

Frontmatter schema example:
```yaml
# pages
title: "About"
slug: "about"
description: "Short bio and links."
navOrder: 1
showTitle: true

# posts
title: "Post Title"
date: "2021-06-02"
slug: "post-title"
description: "One-line summary."
tags: ["writing"]
draft: false
```

Core components:
- [ ] Sidebar (avatar, name, tagline, nav, outbound links)
- [ ] Base layout (sidebar + main content)
- [ ] Publications list (outbound links only)
- [ ] Post list (date + title + summary)

Styling:
- [ ] Plain CSS, defined variables for color/spacing/typography
- [ ] Typography tuned to match vibe from `plans/style_imgs`

Decisions:
- Use Astro content collections:
  - `pages` for static content (`/about`, `/sports`, `/business-strategy`, `/reading`)
  - `posts` for writing index and individual posts (`/writing/:slug`)
- Routes:
  - `/` = writing index (Other writing)
  - `/writing/[slug]` for posts
  - `/about`, `/sports`, `/business-strategy`, `/reading` for pages
- Data:
  - `src/data/site.json` for site metadata (name, tagline, nav items, social links)
  - `src/data/publications.json` for outbound publications lists
- Layouts/components:
  - `BaseLayout.astro` wraps sidebar + main content
  - `Sidebar.astro` renders avatar, name, tagline, nav, social links
  - `PostList.astro` for index + tag views (if needed)
  - `PublicationList.astro` for outbound-only lists
  - `PageHeader.astro` for page titles/subtitles
- Styling:
  - `src/styles/global.css` with CSS variables for color/spacing/type
  - Constrain main column width to match reference images
  - Use a serif for headings + neutral sans for body (loaded via local font files)
  - Light-only theme (no dark mode toggle)
- Outbound publications:
  - Store title, outlet, date, url, and optional note in `src/data/publications.json`
  - Render as link-only lists (no local copies)

---

**4) URL / SEO / Redirect Strategy**
Checklist:
- [ ] Preserve paths where possible
- [ ] Draft redirect map (old -> new -> 301/none)
- [ ] Define per-page metadata spec
- [ ] Canonical, OG/Twitter tags, favicon set

Redirect map example:
```text
/            -> /                 -> none
/about       -> /about            -> none
/strategy    -> /business-strategy -> 301
/writing     -> /writing          -> none
/blog/*      -> /writing/:splat   -> 301
```

Metadata spec:
- [ ] `title`, `description`, canonical
- [ ] Open Graph + Twitter cards
- [ ] Favicon set in `public/favicon/`

---

**5) Migration Plan**
Checklist:
- [x] Map Markdown content to new structure
- [x] Normalize frontmatter to new schema
- [x] Update internal links
- [x] Move images to `public/images/`
- [x] Ensure outbound publications list is link-only

Validation:
- [ ] Link check (internal + external)
- [ ] Visual sanity vs `plans/style_imgs`

Content mapping + normalization (Phase 3 output):

Target paths:
- `/about` -> `plans/gatsby_content/pages/about/index.md`
- `/sports` -> `plans/gatsby_content/pages/sports/index.md`
- `/business-strategy` -> `plans/gatsby_content/pages/business-strategy/index.md`
- `/reading` -> `plans/gatsby_content/pages/reading/index.md`
- `/writing/52-things-i-learned-2019` -> `plans/gatsby_content/posts/2019-12-31---52-things-I-learned-2019/index.md`
- `/writing/hot-hand-fallacy-fallacy-fallacy` -> `plans/gatsby_content/posts/2020-11-01---hot-hand-fallacy-fallacy-fallacy/index.md`
- `/writing/can-you-judge-a-book-by-its-cover` -> `plans/gatsby_content/posts/2020-11-29---Can-you-judge-a-book-by-its-cover/index.md`
- `/writing/52-things-i-learned-2020` -> `plans/gatsby_content/posts/2020-12-27---52-things-I-learned-2020/index.md`
- `/writing/52-things-i-learned-2021` -> `plans/gatsby_content/posts/2021-12-30---52-things-I-learned-2021/index.md`
- `/writing/opponent-elasticity-college-basketball` -> `plans/gatsby_content/posts/2022-04-04--does-opponent-elasticity-matter-in-college-basketball/index.md`
- `/writing/52-things-i-learned-2022` -> `plans/gatsby_content/posts/2022-12-12---52-things-I-learned-2022/index.md`
- `/writing/new-blog-kaleidoscope-mind` -> `plans/gatsby_content/posts/2023-06-19---new-blog-kaleidoscope-mind/index.md`

Frontmatter normalization:
- Pages: add `slug`, `description`, `navOrder`, `showTitle`; map `socialImage` -> `image` (optional)
  - About: `slug: "about"`, `navOrder: 1`, `description: "Short bio and links."`
  - Sports: `slug: "sports"`, `navOrder: 2`, `description: "Sportswriting, analysis, and publications."`
  - Business strategy: `slug: "business-strategy"`, `navOrder: 3`, `description: "Business strategy writing and publications."`
  - Reading: `slug: "reading"`, `navOrder: 4`, `description: "Reading lists and favorites."`
- Posts: normalize `slug` to lowercase, remove `/posts/` prefix, move `category` -> `tags`
  - `random` -> `tags: ["random"]`
  - `sports` -> `tags: ["sports"]`
  - `data-science` -> `tags: ["data-science"]`
  - Preserve `description`, `date`, `draft`, `socialImage` -> `image`

Internal link updates:
- `plans/gatsby_content/pages/about/index.md`: `/pages/business-strategy/` -> `/business-strategy`, `/pages/sports` -> `/sports`
- `plans/gatsby_content/pages/sports/index.md`: `/tag/sports/` -> `/writing/sports` (or drop link if no tag page)
- Normalize any absolute `https://whitakk.com/...` to site-relative where possible

Asset moves (copy to `public/images/` and fix paths):
- `plans/gatsby_content/photo.jpg` -> `public/images/avatar.jpg`
- `plans/gatsby_content/pages/about/photo.JPG` -> `public/images/about.jpg`
- `plans/gatsby_content/pages/business-strategy/photo.JPG` -> `public/images/business-strategy.jpg`
- `plans/gatsby_content/pages/reading/photo.JPG` -> `public/images/reading.jpg`
- `plans/gatsby_content/pages/sports/jadwin.jpg` -> `public/images/jadwin.jpg`
- `plans/gatsby_content/pages/sports/THESIS-FINAL.pdf` -> `public/images/THESIS-FINAL.pdf`
- `plans/gatsby_content/pages/sports/Kevin_Whitaker_SSAC_2013.pdf` -> `public/images/Kevin_Whitaker_SSAC_2013.pdf`
- Post media: `plans/gatsby_content/posts/**/media/*` -> `public/images/posts/**` (keep per-post subfolders)

Encoding cleanup (mojibake to fix during migration):
- `plans/gatsby_content/pages/sports/index.md` (e.g., "Butƒ?İ", "prospectsƒ?T")
- `plans/gatsby_content/pages/business-strategy/index.md` (e.g., "Thatƒ?Ts", "ƒ?" sequences)
- `plans/gatsby_content/posts/2019-12-31---52-things-I-learned-2019/index.md` (e.g., "Aÿ" artifacts)

---

**6) Deployment Plan (Amplify + Route 53)**
Checklist:
- [ ] Create staging branch/app
- [ ] Pin Node version
- [ ] Use lockfile discipline
- [ ] Define build spec
- [ ] Cutover and rollback

Build spec skeleton:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - "**/*"
```

Cutover:
- [ ] Lower TTL before cutover
- [ ] Validate staging
- [ ] Promote to production
- [ ] Roll back by reverting branch/app mapping

---

**7) Risks and Mitigations**
- [ ] Build drift: pin Node + lockfile
- [ ] Dependency rot: minimal deps
- [ ] Broken links: link check before cutover
- [ ] Asset path issues: consistent `public/` usage
- [ ] Redirect gaps: audit route inventory

---

**8) Work Breakdown and Definition of Done**
Phases:
- Phase 1 (S): Inventory + style cues
- Phase 2 (M): Astro architecture + scaffolding plan
- Phase 3 (M): Content migration mapping
- Phase 4 (S): Styling pass for vibe
- Phase 5 (S): QA + redirect validation
- Phase 6 (S): Deploy staging + cutover

Definition of Done:
- [ ] All pages/posts render in Astro
- [ ] Sidebar/nav matches IA
- [ ] Redirects validated
- [ ] Metadata present per page
- [ ] Staging build passes in Amplify
- [ ] Cutover complete with rollback path documented

---

**Appendix A) Route Inventory + Redirect Draft (from `plans/gatsby_content`)**

Current routes inferred:
- [ ] `/` (Other writing / posts index)
- [ ] `/pages/about`
- [ ] `/pages/sports`
- [ ] `/pages/business-strategy`
- [ ] `/pages/reading`
- [ ] `/posts/52-things-I-learned-2019`
- [ ] `/posts/hot-hand-fallacy-fallacy-fallacy`
- [ ] `/posts/Can-you-judge-a-book-by-its-cover`
- [ ] `/52-things-I-learned-2020` (from slug)
- [ ] `/52-things-I-learned-2021` (from slug)
- [ ] `/52-things-I-learned-2022` (from slug)
- [ ] `/opponent-elasticity-college-basketball`
- [ ] `/new-blog-kaleidoscope-mind`
- [ ] `/tag/sports` (linked from sports page)

Route inventory table (source -> current slug -> proposed new):

| Type | Source file | Current slug/path | Proposed new path |
| --- | --- | --- | --- |
| Page | `plans/gatsby_content/pages/about/index.md` | `/pages/about` | `/about` |
| Page | `plans/gatsby_content/pages/sports/index.md` | `/pages/sports` | `/sports` |
| Page | `plans/gatsby_content/pages/business-strategy/index.md` | `/pages/business-strategy` | `/business-strategy` |
| Page | `plans/gatsby_content/pages/reading/index.md` | `/pages/reading` | `/reading` |
| Post | `plans/gatsby_content/posts/2019-12-31---52-things-I-learned-2019/index.md` | `/posts/52-things-I-learned-2019` | `/writing/52-things-i-learned-2019` |
| Post | `plans/gatsby_content/posts/2020-11-01---hot-hand-fallacy-fallacy-fallacy/index.md` | `/posts/hot-hand-fallacy-fallacy-fallacy` | `/writing/hot-hand-fallacy-fallacy-fallacy` |
| Post | `plans/gatsby_content/posts/2020-11-29---Can-you-judge-a-book-by-its-cover/index.md` | `/posts/Can-you-judge-a-book-by-its-cover` | `/writing/can-you-judge-a-book-by-its-cover` |
| Post | `plans/gatsby_content/posts/2020-12-27---52-things-I-learned-2020/index.md` | `/52-things-I-learned-2020` | `/writing/52-things-i-learned-2020` |
| Post | `plans/gatsby_content/posts/2021-12-30---52-things-I-learned-2021/index.md` | `/52-things-I-learned-2021` | `/writing/52-things-i-learned-2021` |
| Post | `plans/gatsby_content/posts/2022-04-04--does-opponent-elasticity-matter-in-college-basketball/index.md` | `/opponent-elasticity-college-basketball` | `/writing/opponent-elasticity-college-basketball` |
| Post | `plans/gatsby_content/posts/2022-12-12---52-things-I-learned-2022/index.md` | `/52-things-I-learned-2022` | `/writing/52-things-i-learned-2022` |
| Post | `plans/gatsby_content/posts/2023-06-19---new-blog-kaleidoscope-mind/index.md` | `/new-blog-kaleidoscope-mind` | `/writing/new-blog-kaleidoscope-mind` |

Proposed new paths:
- [ ] `/` (Other writing / posts index)
- [ ] `/about`
- [ ] `/sports`
- [ ] `/business-strategy`
- [ ] `/reading`
- [ ] `/writing/52-things-I-learned-2019`
- [ ] `/writing/hot-hand-fallacy-fallacy-fallacy`
- [ ] `/writing/can-you-judge-a-book-by-its-cover`
- [ ] `/writing/52-things-I-learned-2020`
- [ ] `/writing/52-things-I-learned-2021`
- [ ] `/writing/52-things-I-learned-2022`
- [ ] `/writing/opponent-elasticity-college-basketball`
- [ ] `/writing/new-blog-kaleidoscope-mind`
- [ ] `/writing/sports` (tag listing or curated sports posts)

Redirect map draft:
```text
/pages/about                             -> /about                                       -> 301
/pages/sports                            -> /sports                                      -> 301
/pages/business-strategy                 -> /business-strategy                           -> 301
/pages/reading                           -> /reading                                     -> 301
/posts/52-things-I-learned-2019          -> /writing/52-things-I-learned-2019             -> 301
/posts/hot-hand-fallacy-fallacy-fallacy  -> /writing/hot-hand-fallacy-fallacy-fallacy     -> 301
/posts/Can-you-judge-a-book-by-its-cover -> /writing/can-you-judge-a-book-by-its-cover    -> 301
/52-things-I-learned-2020                -> /writing/52-things-I-learned-2020             -> 301
/52-things-I-learned-2021                -> /writing/52-things-I-learned-2021             -> 301
/52-things-I-learned-2022                -> /writing/52-things-I-learned-2022             -> 301
/opponent-elasticity-college-basketball  -> /writing/opponent-elasticity-college-basketball -> 301
/new-blog-kaleidoscope-mind              -> /writing/new-blog-kaleidoscope-mind           -> 301
/tag/sports                              -> /writing/sports                              -> 301
```

Notes:
- [ ] Normalize case and remove mixed `/posts/` vs root slugs in the new structure.
- [ ] Keep `/` as the "Other writing" index to preserve navigation intent.
- [ ] Enforce lowercase for new slugs (2020-2022 and 2019 posts).

---

**Appendix B) Content + Asset Migration Checklist**

Pages:
- [ ] `plans/gatsby_content/pages/about/index.md` -> `/about`
- [ ] `plans/gatsby_content/pages/sports/index.md` -> `/sports`
- [ ] `plans/gatsby_content/pages/business-strategy/index.md` -> `/business-strategy`
- [ ] `plans/gatsby_content/pages/reading/index.md` -> `/reading`

Posts:
- [ ] `plans/gatsby_content/posts/2019-12-31---52-things-I-learned-2019/index.md`
- [ ] `plans/gatsby_content/posts/2020-11-01---hot-hand-fallacy-fallacy-fallacy/index.md`
- [ ] `plans/gatsby_content/posts/2020-11-29---Can-you-judge-a-book-by-its-cover/index.md`
- [ ] `plans/gatsby_content/posts/2020-12-27---52-things-I-learned-2020/index.md`
- [ ] `plans/gatsby_content/posts/2021-12-30---52-things-I-learned-2021/index.md`
- [ ] `plans/gatsby_content/posts/2022-04-04--does-opponent-elasticity-matter-in-college-basketball/index.md`
- [ ] `plans/gatsby_content/posts/2022-12-12---52-things-I-learned-2022/index.md`
- [ ] `plans/gatsby_content/posts/2023-06-19---new-blog-kaleidoscope-mind/index.md`

Assets:
- [ ] Avatar: `plans/gatsby_content/photo.jpg` -> `public/images/`
- [ ] Page images: `plans/gatsby_content/pages/*/photo.JPG`, `plans/gatsby_content/pages/sports/jadwin.jpg`
- [ ] Post media: `plans/gatsby_content/posts/**/media/*`
- [ ] PDFs (sports page): `plans/gatsby_content/pages/sports/THESIS-FINAL.pdf`, `plans/gatsby_content/pages/sports/Kevin_Whitaker_SSAC_2013.pdf`

Normalization tasks:
- [ ] Fix case mismatches (`photo.jpg` vs `photo.JPG`) for case-sensitive hosting.
- [ ] Replace hard-coded absolute links to `whitakk.com` with internal links where appropriate.
- [ ] Replace `/pages/...` and `/tag/sports` links with new path scheme.
- [ ] Clean encoding artifacts (example sequences like `A?` and `??`) to valid UTF-8.
