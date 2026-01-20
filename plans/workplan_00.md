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
- [ ] Define directory structure
- [ ] Define content model (pages vs posts)
- [ ] Define frontmatter schema
- [ ] Define core components
- [ ] Styling approach (plain CSS, minimal deps)
- [ ] Handling of outbound publications

Example file tree:
```text
./
|-- src/
|   |-- content/
|   |   |-- pages/
|   |   `-- posts/
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

# posts
title: "Post Title"
date: "2021-06-02"
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
- [ ] Map Markdown content to new structure
- [ ] Normalize frontmatter to new schema
- [ ] Update internal links
- [ ] Move images to `public/images/`
- [ ] Ensure outbound publications list is link-only

Validation:
- [ ] Link check (internal + external)
- [ ] Visual sanity vs `plans/style_imgs`

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
