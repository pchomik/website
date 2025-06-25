# Project: Website

This document contains key facts and conventions for the Docusaurus website project.

## Project Overview

- **Framework:** Docusaurus
- **Language:** TypeScript
- **Package Manager:** bun
- **Source Directory:** `src/`
- **Main Page:** `src/pages/index.tsx`
- **Custom Styles:**
  - `src/css/custom.css` (global styles)
  - `src/pages/index.module.css` (page-specific styles)

## Development

- **Development Server:** The user runs `bun start` in the `website/` directory.
- **Environment:** The user is on WSL2 and views the site in MS Edge on Windows. I cannot see the visual output of my changes.

## Styling

- **Fonts:** The project uses Google Fonts ("Montserrat" for headings, "Lato" for body text), imported in `src/css/custom.css`.
- **Colors:** Custom colors are defined in `index.module.css`.
