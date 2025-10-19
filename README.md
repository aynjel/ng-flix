## NgFlix

NgFlix is an example Angular application (a small Netflix-like frontend) that demonstrates a modular project structure, routing, services, interceptors and reusable UI components. It was scaffolded with Angular CLI v20 and provides pages for movies, TV shows and genres, plus shared components such as a navbar and carousels.

This README documents how to set up the project, run it locally, run tests, and how the source is organized so you (or contributors) can get started quickly.

### Table of contents

- Project status
- Requirements
- Quick start
- Development
- Testing
- Project structure
- Contributing
- License & notes

## Project status

This is a frontend-only Angular app. It expects a TMDB-style API for movie and TV data (the code includes an API access interceptor and services that call out to an API). The repository contains unit tests for important components and services.

## Requirements

- Node.js (LTS) - tested with Node.js 18+. Use nvm or similar if you need multiple versions.
- npm (comes with Node) or yarn/pnpm (if you prefer those package managers).
- Angular CLI (optional globally): npm i -g @angular/cli@20

Verify your environment:

```powershell
node -v
npm -v
ng --version # optional
```

## Quick start

1. Install dependencies:

```powershell
npm install
```

2. Run the development server (default: http://localhost:4200):

```powershell
npm start
# or
ng serve --open
```

3. Open your browser at http://localhost:4200/ (the app will reload automatically when you change files).

Notes:

- If the app needs API access keys (e.g. TMDB), check the environment files in `src/environments` and set your key there or wire a proxy during development.

## Development

- Generate components/services using the Angular CLI to follow the project's conventions. Example:

```powershell
ng generate component shared/components/my-component
ng generate service modules/movie/services/movies
```

- Routing is organized by feature modules under `src/app/modules` and registered in `app.routes.ts`.

- Common code (components, interceptors, models) live in `src/app/shared`.

### Linting and formatting

This project doesn't ship with a specific formatter/linter config by default - consider adding ESLint and Prettier if you want stricter checks.

## Testing

Run unit tests (Karma + Jasmine by default in Angular CLI projects):

```powershell
npm test
```

Unit test files are colocated with components and services and use the `.spec.ts` suffix. There are example specs under `src/app` in each module.

## Project structure

Key folders and files (top-level `src`):

- `src/app/app.ts` - application bootstrap and root module wiring (entry points and top-level providers).
- `src/app/app.routes.ts` - application routes.
- `src/app/app.config.ts` - app-specific configuration values.
- `src/app/modules/*` - feature modules: `movie`, `tv-show`, `genre`, each with routes, pages and services.
- `src/app/shared/components` - reusable UI components (navbar, carousels, back-to-top, etc.).
- `src/app/shared/interceptors` - HTTP interceptors (for API key injection or request/response handling).
- `src/app/shared/models` - TypeScript models used across services and components.
- `src/environments` - environment configuration (development vs production). Update these files with API keys or base URLs as needed.

Example notable files:

- `src/app/modules/movie/services/movies-service.ts` - service that fetches movie lists and details.
- `src/app/shared/interceptors/tmdb-api-access-interceptor.ts` - attaches API access params to outgoing requests.

## Contributing

If you'd like to contribute:

1. Fork the repository.
2. Create a branch for your changes: `git checkout -b feat/your-feature`.
3. Run the app and tests locally.
4. Open a pull request with a clear description and screenshots if applicable.

Guidelines:

- Keep commits small and focused.
- Add or update unit tests for new behaviors when possible.

## License & notes

This repository doesn't include licensing information. Add a LICENSE file if you plan to make the project public or accept contributions.

## Troubleshooting

- If `npm start` fails, run `npm ci` (clean install) or delete `node_modules` and run `npm install` again.
- For CORS or API routing issues during development, consider using an Angular CLI proxy or a local mock server.

---
