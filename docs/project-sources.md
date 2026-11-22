# Current project content and images

Updated 22 November 2026. The project showcase now focuses on the piano application and Neon Riot. Wedding Media Uploader, My Task Sleep and the older portfolio entry are removed from the showcase, along with their unused interface images and capture fixtures.

## Piano practice application

The owner's current internal build plan and architecture notes were reviewed. The current direction supersedes the older local lesson-first plan: an English/Greek native Android practice application in Kotlin and Jetpack Compose, with a shared practice engine, generated exercises, local song storage, falling notes, a keyboard and staff view, and MIDI/score/audio import tools. Automatic readings remain estimates. Hand-guide and import work continues; this is not described as a publicly released application. No private repository URL, internal project notes, imported songs or source code are published here.

`src/assets/projects/piano-app.png` is the owner's actual 1080×2400 capture of a scale exercise in the Android build, including hand guides. It is not generated concept art. Astro produces a 900px-wide WebP for the page, preserving the source for later use. The screen is part of work in development, not a claim that all displayed functionality has completed user review.

## Neon Riot

Sources: [the public game](https://neon-riot.ui8.dev), its publicly served React wrapper and Canvas engine, and [Forge](https://ui8.ai/forge/). The browser loaded the live game successfully after an external page reader initially returned an import error. Inspected controls cover movement, punches, kicks, jumps and combinations. The game is labelled in development. No claim is made about a commercial release or measured performance.

`src/assets/projects/neon-riot.png` is a 1920×1080 browser capture of the actual live title screen, not an invented game image. Astro serves a 1600px-wide WebP. Its pixel-art and neon colours belong to the actual project; the portfolio retains its calm blue/yellow palette.

Forge is credited as the visual development environment used for the game. It is not represented as the underlying game engine or as the framework for the Android application.

## Publication

Cloudflare receives only `dist`. Website source is pushed to the existing `MariosToump/Portfolio` repository with its earlier root HTML and profile images retained. Source publication excludes original CVs, cover letters, environment files, runtime caches, local test output and release archives. Git commits use the owner's GitHub noreply address.
