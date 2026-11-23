GATE: ERROR (consistency.mjs could not walk 1440, 390; check.mjs could not run (exit 2: check: timed out))

# Personal CV and portfolio — design plan and verification report

Kind: service; audience: recruiters and colleagues reviewing Marios Toumpoulas's work. Primary action: See my experience. Facts come from the supplied bilingual CVs and the public GitHub source review in project-sources.md.

Deal: split hero (the first film deal was unsuitable: no film is provided); the client's calm sky-blue / light-yellow colours via the brand path, deep teal actions. Retain locally bundled Greek-capable Noto Serif and Noto Sans because the original brief requires Greek support and no external font requests. Word-highlight moment in Music, with its readable still state. No shaders, fake logos, counters or stock people.

Voice: the direct first-person CV language supplied by the owner. Keep confirmed duties and dates; no invented business metrics, software deployments or album titles.

Page: introduction and portrait on separate columns; compact Sovel case-study link beneath. Public projects show real repository interfaces and source links. Full experience remains chronological and filterable. Factory case study retains the explicitly labelled illustrative demo. Music keeps composition, guitar and two albums. Education, languages and contact close the page.

Motion: Taste's unmodified hero entrance and hover layer; the dealt word-highlight turns the opening music sentence to ink while scrolling. Emil's guidance keeps frequent controls immediate, focus rings static, input text at least 16px and hover capability-gated. Everything remains readable without JavaScript, under reduced motion and in print.

Intentional brief overrides: the h1 is the owner's name, the blue/yellow gradient is explicitly requested, demo sample labels are required, long CV sections grow with content rather than clipping into exact viewport-height marketing sections, and the portrait stays translucent with no text over the face. No new photographs are needed. Real-device touch feel cannot be verified from Windows browser emulation.

Installed sources: Taste Skill f6b76575f949707b4e3c37cd86cb44b0b98643e8; Emil Kowalski skills 64eb3deb9a5fbfa041faf783e0bc3fd635872e9c. Installed globally in Codex, not inside the deployable website. Only the used motion modules are copied into public/design, unchanged.

Current project images: actual high-resolution captures of the Android piano build and the live Neon Riot game. These replace the earlier repository interface previews. The selected piano image shows an exercise, with no personal song library or private source visible. Image provenance and the current project descriptions are documented in project-sources.md.

Taste gate: `GATE: ERROR (consistency.mjs could not walk 1440, 390; check.mjs could not run (exit 2: check: timed out))`. The checker was not rerun, as its instructions require. No visual-gate pass is claimed and no waivers were added. Copy lint had zero failures; its remaining warning counts CV section labels and report-status metadata as repeated eyebrows. These labels remain because they identify CV topics and demo state. Independent Playwright checks and direct screenshot inspection provide the browser evidence; they are not a substitute claim that the Taste gate passed.

The portrait is served through Astro's static image pipeline as a 640px transparent WebP (59,188 bytes), down from the original 1,771,704-byte PNG. The source portrait and its alpha are retained. The final build passes Astro checks (two unused-parameter hints in unmodified third-party modules). Playwright covers both languages in Chromium and WebKit at 320, 360, 390, 768, 820, 1024 and 1440 pixels, including real image decoding after lazy images enter view. Pixel 7 and iPhone 13 checks are emulation, not physical-device tests.

## Experience and portrait refinement

Role descriptions now use concise action-led wording while retaining confirmed titles, responsibilities, employers and dates. No claims-processing responsibilities or performance results were added. A selected-career overview derives its dates from the shared role records; the full chronological history remains below it. Original SVG icons distinguish the work areas without using employer logos. The Django feature includes a labelled diagram of fault logging, priority flags and status tracking, describing the confirmed workflow rather than claiming to show the original software interface.

The portrait is larger (up to 580px high on wide screens, 360px on phones), with a soft double outline. A fine-pointer hover applies a 1.035 image scale and opacity change; touch does not depend on this effect. Reduced motion removes the transform. Responsive 400/640/800px WebP variants preserve transparency. Tests check the hover effect, reduced-motion still state, career and workflow graphics, touch filtering and report reset, plus portrait/landscape overflow in Pixel 7 Chrome and iPhone WebKit emulation. Physical Android hardware was not available.

## Reference-inspired typography and background

The ICON Platforms reference was inspected in the browser: Montserrat headings and Inter body text. Inter was selected for the whole portfolio to keep the English and Greek typography consistent. The Fontsource package supplies local Latin/Greek 400 and 600 subsets; the original SIL Open Font License and copyright notice ship at public/licenses/inter-OFL.txt. No font files, assets or code were downloaded from the reference site.

AmbientNetwork.astro is original still SVG artwork inspired by the general lines-and-dots idea visible on the TALOS MaiND welcome screen. It sits behind the welcome area at low opacity, fades out below it, cannot intercept input, is hidden from assistive technology and print, and adds no JavaScript, animation loop or pointer tracking. Mobile sizing retains the fine line and dot proportions rather than stretching them.
