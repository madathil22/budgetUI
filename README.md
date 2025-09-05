## Budget UI

React + TypeScript app powered by Vite. Provides budget planning screens for Plan, Liability, and Income, using React Router, Bootstrap, and AG Grid.

## Requirements

- Node.js >= 20
- pnpm 9 (recommended) — npm/yarn also work

## Quick Start

```bash
pnpm install
pnpm dev
```

Dev server runs at http://localhost:5173 (auto-opens by default).

## Scripts

- `pnpm dev`: Start Vite dev server
- `pnpm build`: Build for production into `dist/`
- `pnpm preview`: Preview the production build at http://localhost:4173
- `pnpm test`: Run unit tests with Vitest (jsdom)

Equivalent npm commands also work, e.g. `npm run dev`.

## Testing

- Test runner: Vitest with jsdom
- Setup file: `src/test/setup.ts`

Run tests:

```bash
pnpm test
```

## Backend/API

- Axios instance configured in `src/api.ts`
- Default base URL: `http://localhost:6060/`
- Update this if your API runs elsewhere

## OAuth/Social Login

- OAuth client/app settings live in `src/social.ts`
- Replace example Google and Facebook config with your own credentials before deploying

## Project Structure (key files)

- `src/main.tsx`: App entry, mounts React
- `src/App.tsx`: Routes and navigation
- `src/components/plan/PlanComponent.tsx`: Plan grid
- `src/components/liability/LiabilityComponent.tsx`: Liability grid
- `src/components/income/IncomeComponent.tsx`: Income grid
- `src/api.ts`: Axios instances (backend & Google APIs)
- `vite.config.js`: Vite and Vitest configuration

## Environment Variables

Vite reads env vars prefixed with `VITE_`. Add a `.env` file at the project root, e.g.:

```
VITE_API_BASE_URL=http://localhost:6060
```

Then reference via `import.meta.env.VITE_API_BASE_URL`. (Current code uses a hardcoded base URL in `src/api.ts`; switch to env usage if desired.)

## Build & Deploy

```bash
pnpm build
```

Outputs production assets to `dist/`. Serve `dist/` with any static host (Nginx, Netlify, Vercel, etc.) or locally with:

```bash
pnpm preview
```

## Notes

- Styling: Bootstrap 5 and custom CSS in `src/*.css`
- Icons: Font Awesome
- Grids: AG Grid React
- Routing: `react-router-dom@6`
