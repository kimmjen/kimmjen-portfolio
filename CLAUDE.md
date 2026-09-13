# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Kim Je Min (Data Engineer). Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Uses pnpm as package manager.

## Common Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build (static export)
pnpm lint         # ESLint
pnpm preview      # Build + serve static output
pnpm deploy       # Build for GitHub Pages + deploy via gh-pages
```

## Architecture

- **Static export**: `output: 'export'` in next.config.ts — no server-side features (no API routes, no SSR)
- **GitHub Pages deployment**: When `GITHUB_PAGES=true`, basePath/assetPrefix are set to `/kimmjen-portfolio`
- **Dual language**: Korean/English via `LanguageContext` (`src/context/LanguageContext.tsx`). Translations for UI strings are inline in the context; content translations come from `src/data/resumeData.ts` keyed by `'ko' | 'en'`
- **Dark mode**: `ThemeContext` (`src/context/ThemeContext.tsx`) with light/dark/system modes. Applies CSS class to `<html>` element
- **All pages are client components** — contexts use `'use client'` and localStorage for persistence

## Key Data Flow

Resume/portfolio content is centralized in `src/data/resumeData.ts` (types: `ResumeData`, `Experience`, `Skill`, `PersonalProject`). Components read this data via `useLanguage().data`. Adding or modifying portfolio content should be done in this data file.

## Pages

- `/` — Main portfolio (profile, experience, skills, projects, contact)
- `/resume` and `/resumev2` — Resume views
- `/career` — Career details
- `/coverletter` — Cover letter page (data in `src/data/coverLetterData.ts`)

## Layout

The main page uses a two-column layout: left sidebar (logo + nav via `Header`) and right content area with sections. CSS classes prefixed with `jm-` (e.g., `jm-layout`, `jm-article`) are custom layout classes defined in `globals.css`.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).
