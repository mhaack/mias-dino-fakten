# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Mias Dino Fakten" - a German-language dinosaur encyclopedia website built with Astro. The site features comprehensive dinosaur information, interactive maps showing discovery locations, and a "Dinosaur of the Month" feature. Content is managed through Netlify CMS with a Git-based editorial workflow.

## Development Commands

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm check        # Run Astro check for issues
pnpm type-check   # TypeScript type checking
pnpm format       # Format code with Biome
pnpm lint         # Lint code with Biome

# Content Management
pnpm new-post     # Create new dinosaur entry via script
```

## Architecture

### Content Management
- **Collections**: Single `dinos` collection with rich TypeScript schemas defined in `src/content/config.ts`
- **CMS**: Netlify CMS at `/admin` with editorial workflow (config: `public/admin/config.yml`)
- **Images**: Stored in `src/assets/images/` and managed via CMS
- **Schema**: Includes location coordinates, size data, discovery info, and taxonomic details
- **Content Utilities**: `src/utils/content-utils.ts` provides helpers for sorting, filtering, and building navigation

### Technology Stack
- **Framework**: Astro 4.15+ with TypeScript
- **Interactive Components**: Svelte for map and search functionality
- **Styling**: TailwindCSS with custom theme
- **Search**: Pagefind for static site search (only works in production builds, not dev mode)
- **Internationalization**: German primary with i18n framework

### Routing
- **File-based routing** in `src/pages/`
- **Dynamic routes**: `[...slug].astro` for individual dinosaur pages
- **Static generation**: Uses `getStaticPaths()` to generate routes from content collections
- **Draft filtering**: Drafts hidden in production via `import.meta.env.PROD` checks

### Key Components
- **Map**: `src/components/map/Map.svelte` - Interactive discovery location map using MapLibre
- **Search**: `src/components/Search.svelte` - Client-side search with Pagefind
- **Content**: `src/content/dinos/` - Markdown files for each dinosaur (56 entries)

### Custom Plugins
- `src/plugins/remark-reading-time.mjs` - Calculates reading time
- `src/plugins/remark-excerpt.js` - Generates content excerpts
- `src/plugins/rehype-component-admonition.mjs` - Processes admonition blocks

## Content Structure

Dinosaur entries follow this schema:
- Basic info (name, discovery year, location)
- Physical characteristics (length, weight, diet)
- Geographic data (coordinates for map display)
- Images and descriptions
- Categories and tags for organization

## Special Features

- **Dino of the Month**: Managed via `dotm` array in frontmatter (contains month dates like `2025-04-01`)
- **Interactive Map**: Shows discovery locations with popup details, generated from `locations` array (ISO country codes)
- **Multilingual Ready**: German content with extensible i18n system
- **Editorial Workflow**: Content changes go through review process in Netlify CMS

## Build & Deployment

- **Target**: Static site generation for Netlify
- **Search Integration**: Pagefind is built after Astro build (`pnpm build` runs both)
- **Testing Search**: Search functionality requires a production build - use `pnpm build && pnpm preview` to test
- **Optimization**: Image processing, compression, and bundle splitting enabled
- **Content**: Automatically processes markdown with custom plugins during build

## Code Style

- **Formatter**: Biome with 2-space indentation, single quotes, trailing commas
- **Linting**: Comprehensive ruleset including a11y, performance, and security rules
- **TypeScript**: Strict type checking with isolated declarations enabled

## Key File Locations

- **Site config**: `src/config.ts` - Site metadata, theme settings, navigation
- **Content schema**: `src/content/config.ts` - Zod schemas for dinosaur entries
- **Content utilities**: `src/utils/content-utils.ts` - Post sorting, filtering, tag/category aggregation
- **Astro config**: `astro.config.mjs` - Framework configuration and integrations
- **CMS config**: `public/admin/config.yml` - Netlify CMS field definitions and workflow
- **Main layout**: `src/layouts/Layout.astro` - Base page template
- **Homepage**: `src/pages/index.astro` - Landing page with latest dinosaurs
- **Dinosaur page**: `src/pages/dinos/[...slug].astro` - Individual dinosaur template