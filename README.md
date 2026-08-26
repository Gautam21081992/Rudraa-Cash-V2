# Rudraa Cash — Premium 10-Page Website

Rudraa Cash is a React + Vite + Tailwind CSS v4 frontend for Rudraa Business Solutions Pvt. Ltd.

## Stack

- React 19
- Vite 7
- React Router
- Tailwind CSS v4 via the Vite plugin
- Lucide React icons
- CSS-driven premium animations

## Routes

- `/`
- `/identity`
- `/rudraa-cash`
- `/core-values`
- `/about`
- `/vision-mission`
- `/retailers`
- `/ecosystem`
- `/technology`
- `/contact`

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Cloudflare Pages

For a Vite static site:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: use a current LTS release compatible with the selected Vite/React stack.

If deploying as a single-page application, configure the host to serve `index.html` for application routes when required by the hosting setup.

## Contact form

The form currently performs client-side validation and presents a safe local success state. It does **not** pretend to send data to a server.

To connect a real form endpoint later, use `VITE_CONTACT_ENDPOINT` and keep private credentials server-side.

## Brand assets

The supplied Rudraa logo was cleaned for web use without changing the core R + Trident + Infinity identity.

- `public/assets/logo/rudraa_logo.png` — transparent PNG, 1200×1200
- `public/assets/logo/rudraa_logo.webp` — web-optimized WebP, 1200×1200
- `public/assets/logo/rudraa_logo_white.png` — white-background PNG
- `public/assets/logo/rudraa_favicon.png` — favicon-ready PNG

A true vector SVG was not fabricated from the raster source. When an original vector is supplied, replace the raster asset with the official vector.

## Content safety

This implementation intentionally avoids inventing:

- RBI approvals
- licenses or certifications
- transaction volumes
- retailer counts
- revenue
- banking/payment partnerships
- security certifications
- unsupported company history

Illustrative roadmap and network numbers are explicitly labelled as vision/illustrative milestones.
