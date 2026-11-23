# Marios Toumpoulas — bilingual CV

Static Astro 7.4.13 + TypeScript. English: `/en/`; Greek: `/el/`; `/` also serves English. No backend, analytics, external fonts, storage or credentials. All original PDFs stay outside the build.

The current redesign applies [Taste Skill](https://github.com/Leonxlnx/taste-skill) and Emil Kowalski's design-engineering guidance. Both skill collections are installed globally in Codex. `docs/redesign.md` records the design decisions and the original brief's requirements. Used Taste motion files are kept unchanged in `public/design/` with their MIT license. The current project images are actual high-resolution captures of the owner's Android piano build and the live Neon Riot game; see `docs/project-sources.md`.

## Windows PowerShell

Use Node.js 24 LTS. `npm.cmd` works even when PowerShell blocks `npm.ps1`.

```powershell
Set-Location 'D:\My website'
npm.cmd ci
npm.cmd run dev
```

Open the Local URL printed in the terminal, normally http://127.0.0.1:4321/en/. Stop with Ctrl+C.

Production build and local preview:

```powershell
npm.cmd run build
npm.cmd run preview -- --port 4321
```

`dist` is the complete deployable site. The preview only serves this local build. After changing source, rebuild or use `dev` for automatic updates.

## Content and privacy

- `src/data/content.ts` holds typed bilingual content. Edit a role's shared `start` / `end` once to update dates in both languages. A null end means present. Keep stable IDs and newest-first ordering. Categories may overlap; the grouped 2014–2021 entry does not assign individual employer dates.
- The case study is in the `copy` object; its date and employer use the `sovel-web` role. Current projects are typed in `src/data/projects.ts` and re-exported by the shared content source. Each has bilingual title, description, skills summary and development status, with optional public links. `ProjectCard.astro` renders the images through Astro's WebP pipeline. Evidence for the current descriptions is recorded in `docs/project-sources.md`. The piano app has no public release or repository link; Neon Riot links to its playable build and Forge.
- `src/data/config.ts` defaults to no public email and no downloadable PDF. Only opt in after review. Set `email` to an explicitly approved public address. For downloads, create independently redacted PDFs, inspect their text and metadata, place only those approved copies in `public/downloads/`, and set `redactedPdfs.en` / `.el` to paths such as `/downloads/cv-en.pdf`. Never put the original CVs or cover letters into `public/`.
- Without approved downloads, use **Print CV / Save as PDF**. The print stylesheet includes every role even after filtering and removes navigation and demo controls. With JavaScript disabled, use the browser's Print command.
- The illustrative demo uses fictional equipment. Changes last only until navigation or reload; no data is transmitted or retained. It is separate from the original Sovel software.
- Inter is bundled locally through Fontsource with Latin and Greek subsets at weights 400 and 600. Its SIL Open Font License and copyright notice ship at `public/licenses/inter-OFL.txt`. The original network background is a still SVG; it makes no requests, captures no input, and has no animation loop.

## Checks

With the production preview running in another terminal:

```powershell
npx.cmd playwright install chromium webkit
npm.cmd test
```

The browser checks cover both languages in Chromium and WebKit, widths 320/360/390/768/820/1024/1440, Pixel 7 and iPhone 13 touch emulation in portrait and landscape, 200% text sizing, keyboard/skip link, filters, demo/reset/live summary, portrait hover and reduced-motion states, career/workflow graphics, language anchor preservation, local Greek fonts, no-JavaScript history, internal links, print visibility and default privacy. Screenshots, A4 PDFs and a verification report are written to `test-results/` (not published). `npm.cmd run build` runs Astro's TypeScript checks before building.

Browser tests are emulation on Windows, not tests on physical Android or iOS devices. Chromium verifies Tab reaches the skip link. Windows WebKit's default Tab cycle skips links, so its check verifies initial button focus and explicitly focuses the skip link before keyboard activation; Safari's full keyboard access remains a physical-device check. Review the saved print PDFs and try the site on actual phones before publishing. The local font check verifies loading; screenshots provide visual inspection. The privacy audit intentionally rejects all PDFs and the private source contact details in the default build; adjust it deliberately if approved public downloads are enabled later.

## Publish it yourself

Published on Cloudflare Pages: https://marios-toumpoulas.pages.dev/en/ (Greek: `/el/`). Project: `marios-toumpoulas`; production branch: `main`. Upload **only `dist`**, never the project folder containing private PDFs.

Website source is maintained in https://github.com/MariosToump/Portfolio. Its earlier root `index.html` and profile images are retained as the legacy portfolio; the Astro website builds from `src/pages/` into `dist/`.

To publish a later update after reviewing it locally:

```powershell
npm.cmd run build
npx.cmd --yes wrangler pages deploy dist --project-name marios-toumpoulas --branch main
```

If needed, sign in first with `npx.cmd --yes wrangler login --scopes account:read user:read pages:write`. Credentials are managed by Wrangler outside this project's source. The existing Pages project accepts direct uploads; no Workers entry point is needed.

### Cloudflare Pages Free — Direct Upload

1. Run `npm.cmd run build` and review the local preview.
2. Sign in to Cloudflare, select **Workers & Pages**, then create a **Pages** application using **Direct Upload / drag and drop**. Choose the Free option; dashboard labels may vary.
3. Supply your own project name and upload the built `dist` folder (or a ZIP containing its contents). Confirm the upload in the dashboard when you are ready to publish.
4. Use the assigned `pages.dev` address; no particular subdomain is assumed. Verify `/`, `/en/`, `/el/` and the language links there.

[Official Direct Upload instructions](https://developers.cloudflare.com/pages/get-started/direct-upload/). Direct Upload projects cannot later switch to Git integration; that requires a new project.

### Netlify Free fallback

Choose Netlify's Free plan, create a project by manual deploy / drag and drop, and upload the same built `dist` folder. Use its assigned address and check the three routes. No server adapter or environment variables are needed. Review current Free-plan allowances in the provider dashboard before publishing.

[Official Netlify deploy instructions](https://docs.netlify.com/deploy/create-deploys/).
