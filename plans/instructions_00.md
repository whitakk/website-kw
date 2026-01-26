You are my coding agent. Do NOT implement anything yet. Your only output should be a thorough, step-by-step PLAN (with checklists) for rebuilding my personal website from scratch.

Context
- Current site: personal website used primarily as an online resume and secondarily as a home for 5–10 blog-like posts.
- IA: “About me” homepage + 3–4 sidebar-linked pages (career facets) + a small blog/writing section.
- Current stack: Gatsby template from a few years ago; it’s fragile and annoying to update (build failures, random breakage).
- Hosting: AWS Amplify + Route 53 + custom domain + GitHub repo. I want to keep this hosting setup.
- Design: I like the current look/feel (simple sidebar layout, clean typography). I want to preserve the general aesthetic but I’m fine rebuilding the code entirely.

Screenshots (for style + structure)
- Page style resembles: left sidebar with avatar/name/tagline + nav links; main content on right with large page heading; simple link styling.
- Sections include:
  1) About me / home page with short bio + outbound links (LinkedIn/Substack/Twitter/GitHub/GoodReads).
  2) Business & Strategy page with intro paragraph + “Selected publications” list.
  3) “Other writing” / blog index page listing a handful of posts.

Non-goals / constraints
- No analytics / tracking (no GA, Plausible, etc.).
- No contact form. Optional mailto link only if low-risk; otherwise omit and rely on external contact links (e.g., LinkedIn).
- Visual parity is NOT required; keep the “vibe” only.
- No explicit performance targets; just avoid heavy client-side JS and keep dependencies minimal.
- Prefer boring tech, static output, minimal moving parts, no CMS.

What I want from you (PLAN ONLY)
Produce a plan that covers:

1) Framework recommendation (pick one) optimized for long-term stability + low maintenance.
   - Default assumption: static site with Markdown/MDX content.
   - Explicitly compare Gatsby vs (Astro / Next static export / 11ty / Hugo) and justify the choice for my constraints.

2) Target architecture:
   - Directory structure
   - Content model (pages vs posts, frontmatter schema, tags/categories kept simple)
   - Components (sidebar/nav, layout, typography, list rendering for publications, etc.)
   - Styling approach (plain CSS vs Tailwind, etc.) with a minimal-dependency philosophy
   - Handling of PDFs for “selected publications” when needed (e.g., storing in public assets and linking)

3) URL/SEO/redirect strategy:
   - Include an explicit first step: inventory current routes/paths from the existing site
   - Plan should output a redirect map: old_path → new_path → redirect? (301/none)
   - How to preserve existing paths when possible
   - Redirect rules if paths change (Amplify redirects)
   - Metadata spec: per-page title/description, canonical, Open Graph/Twitter cards, favicon set
   - Sitemap/RSS optional (include a recommendation)

4) Migration plan:
   - How to extract/migrate content from the Gatsby repo into the new structure
   - How to handle images and other static assets
   - How to handle the few “blog-like posts” (Markdown/MDX)
   - How to validate parity (link checking + basic visual sanity), without aiming for pixel-perfect matching

5) Deployment plan (Amplify + GitHub + Route 53):
   - Recommended staging approach (second Amplify app or branch)
   - Build settings, pinned Node version, lockfile discipline, minimal CI complexity
   - Cutover steps and rollback strategy
   - Include cert/DNS considerations (TTL, avoiding downtime)

6) Risk list + mitigations:
   - Build environment drift, dependency rot, broken links, asset path issues, etc.

7) Work breakdown:
   - Phases with milestones
   - Estimated complexity per phase (S/M/L) and dependencies between tasks
   - A final “Definition of Done” checklist

Questions you may assume answers for (do not ask me yet; pick defaults)
- I am OK with Markdown/MDX for posts.
- Posts are few (5–10), so no need for search or complex taxonomy.
- I am the only editor; editing in-repo is fine; keep preview flow simple.

Output format
- Use headings and checklists.
- Include concrete examples of:
  - proposed file tree
  - frontmatter schema
  - Amplify build spec skeleton (but do NOT implement)
  - redirect rule examples

Again: do NOT write code. Do NOT scaffold repos. Only produce the plan.
