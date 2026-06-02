# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A full-stack web-application boilerplate: an Express/TypeScript server, a Create React App (CRA) + Redux Toolkit frontend, and a `node-pg-migrate` PostgreSQL migration runner. The three live as **npm workspaces** (`server`, `frontend`, `migration`) under the root `package.json`. Node `^20.20.0` / npm `^10.8.2` (see `.nvmrc`).

## Commands

Run all from the repo root. Install deps with `npm install --save-dev --legacy-peer-deps` (legacy peer deps are required because of CRA/react-scripts version pins).

Local dev (run each in its own terminal, in order):
```bash
npm run database-start   # ephemeral postgres in docker (port 5432, password "develop")
npm run migrate          # apply migrations against the running db
npm run server-watch     # build frontend, then run server with nodemon (port 5000)
npm run frontend-start   # CRA dev server with hot reload (port 3000)
```

Containerized dev (full stack incl. postgres + migration, via Docker):
```bash
docker-compose -f compose.dev.yaml build
docker-compose -f compose.dev.yaml up -d
```

Other:
- `npm run frontend-build` — build CRA and copy `frontend/build` → `server/public` (how the server serves the SPA).
- `npm run server-start` — production-style: build frontend then run compiled server.
- Server build: `npm run build --workspace=server` (runs `tsc`, output to `server/dist`).
- Frontend tests: `npm run test --workspace=frontend` (react-scripts/Jest). Single test: `npm run test --workspace=frontend -- <pattern>`. **No server or migration tests exist** — their `test` scripts are stubs that exit 1.

## Architecture

### Server (`server/`, TypeScript → `dist/`)
- **Clustering**: `src/index.ts` forks `CONFIG.NODE_CORES` workers via Node `cluster`. `src/lib/clusterManagement.ts` defines `masterStart()` (runs once in primary) and `forkStart()` (runs per worker — this is where the global `pg` `Pool` is created). Put one-time setup in `masterStart`, per-worker setup in `forkStart`.
- **DB access**: the `pg` Pool is attached to `global.dbPool` (typed in `src/globalDeclares.ts`). There is no ORM — use raw `pg` queries off `global.dbPool`.
- **Routing** (`src/setupRoutes.ts`, order matters): static files from `../public` → `/api` router → SPA fallback (`handleSPA`) → 404. `handleSPA` serves `index.html` only for navigation requests (`sec-fetch-mode: navigate`), otherwise calls `next()`. Add API logic to `src/routes/api.ts`; new top-level routes are registered in `setupRoutes.ts` and re-exported through `src/routes/index.ts`.
- **HTTPS**: in production with `SSL_CERT` + `SSL_KEY` set, a second HTTPS server starts and the `forceHTTPS` middleware redirects http→https.
- **Templating**: express-handlebars is configured (`.hbs`, `views/layouts`, `views/partials`) but the app is currently SPA-first.
- **Config**: all env-driven via `src/config.ts` (`NODE_ENV`, `NODE_CORES`, `HTTP_PORT`/`HTTPS_PORT`, `DOMAIN`, `DB_*`). Defaults target local dev.

### Frontend (`frontend/`, CRA + TypeScript)
- **State**: Redux Toolkit store in `src/reduxElements/index.ts`. Use the typed `useDispatch`/`useSelector` exported there (not the react-redux defaults). Each slice lives in its own folder under `reduxElements/` (e.g. `remotingState/`) and is registered in the store's `reducer` map.
- **Remoting pattern**: all external/API calls live in `src/remoting/index.ts` as **thunks**. `fetchWrapper` wraps `fetch`, auto-increments/decrements `uiBusy` and pushes failures into `uiErrors` (the `remotingState` slice) — write new API calls as thunks built on `fetchWrapper` so loading/error UI state stays consistent.
- **Routing**: `react-router-dom` v6 in `src/App.tsx`; route components are lazy-loaded via `React.lazy`.
- **Styling**: MUI v5 with Emotion; theme in `src/styles/materialThemes.ts`, shared styles in `src/styles/commonStyles.ts`.
- **Dev proxy**: `src/setupProxy.js` proxies `/api` to the server (`DEV_SERVER_PROXY` env, default `http://localhost:5000`) so the CRA dev server and API share an origin.

### Migrations (`migration/`, plain JS)
- `node-pg-migrate` runner. `index.js` runs all migrations `up`; SQL/JS migration files live in `migration/migrations/` (timestamped). Connection is env-driven via `migration/config.js` (`DATABASE_USER`/`DATABASE_PASS`/`DATABASE_HOST`/`DATABASE_PORT`).

## Conventions

- The server is TypeScript and compiled with `tsc`; the migration workspace is plain CommonJS JavaScript. Don't assume one workspace's tooling applies to another.
- The server serves the built SPA from `server/public`, which is **generated** by `frontend-build` (gitignored-style copy) — don't edit `server/public` by hand.
- New Redux state, API thunks, and routes each follow the established index re-export pattern (slice folder → `reduxElements/index.ts`; route module → `routes/index.ts`).
