<!-- Auto-generated guidance for AI coding agents working on this repository. -->
# Copilot / AI Agent Instructions

This repository is a Vite + React + TypeScript frontend scaffold using a shadcn-ui style component library, Tailwind CSS, and React Router. Use these focused, actionable rules when editing, adding features, or creating PRs.

- **Project entry**: The app launches from `src/main.tsx` which mounts `src/App.tsx`.
- **Routing**: `src/App.tsx` is the authoritative route manifest. Add new pages under `src/pages/` and then add the route in `App.tsx` above the catch-all `*` route (there is an inline comment reminding this).
- **UI primitives**: Reusable UI components live in `src/components/ui/` (shadcn-derived). Prefer these over ad-hoc HTML for consistent accessibility and styling.
- **Global app state**: `src/lib/app-context.tsx` exposes `useAppContext()` and `AppProvider`. Key state keys: `versionMode`, `userType`, `isAuthenticated`, `walletBalance`, `selectedCollege`. Use/update these rather than creating ad-hoc global state.
- **Styling & utilities**: Tailwind is used; utility helper `cn` is in `src/lib/utils.ts` (wrapper around `clsx` + `twMerge`). Use `cn()` to compose class names.
- **Path aliases**: `@` is aliased to `./src` (see `vite.config.ts` and `tsconfig.json`). Import with `@/...` (for example `@/components/ui/button.tsx`).
- **Data fetching**: The project uses `@tanstack/react-query`. Create hooks that use `useQuery` / `useMutation` and centralize API calls where practical.
- **Dev tooling**: Run the project with `npm i` then `npm run dev` (Vite). Notable scripts in `package.json`: `dev`, `build`, `build:dev`, `preview`, and `lint`.
- **Local dev host/port**: Vite server is configured in `vite.config.ts` to listen on host `::` and port `8080`. When debugging, check that port.
- **Lovable integration**: The repo contains `lovable-tagger` in dev plugins and README mentions Lovable. Be careful: `lovable-tagger` runs only in development in `vite.config.ts` and may add annotations to components.
- **Component structure conventions**: Pages are at `src/pages/*`, grouped by area (e.g., `mentor/`, `mentee/`, `universal/`). Shared components live in `src/components/` and UI primitives in `src/components/ui/`.
- **Routing conventions**: Use nested directories for route areas, consistent naming, and import patterns found in `App.tsx` (group mentor/mentee flows together). Keep route paths and filenames clear (e.g. `src/pages/mentor/MentorProfile.tsx` -> route `/mentor/profile`).
- **Adding a new page (example)**:
  1. Create file `src/pages/<area>/<NewPage>.tsx` (use existing pages as examples).
  2. Export a default React component from the file.
  3. Import and add a `<Route path="/your/path" element={<NewPage/>} />` in `src/App.tsx` above the `*` route.

- **Linting & formatting**: Run `npm run lint` to execute ESLint. There is no project-wide Prettier config in the repo; match the existing code style.
- **Tests**: There are no tests in the repository—do not add test frameworks without discussing with maintainers.

- **External dependencies to note**:
  - `@tanstack/react-query` (data fetching patterns)
  - `react-router-dom` v6 (routing patterns)
  - `sonner`, `vaul`, `lovable-tagger` (UX & dev tooling)

- **Common pitfalls**:
  - Do not add routes below the catch-all `*` route — they will never be reached.
  - Use `@` imports to avoid relative path churn.
  - Keep shared UI in `src/components/ui/` and avoid duplicating styles.

- **Small code examples**:
  - Import example: `import { Button } from "@/components/ui/button";`
  - Use context: `const { userType, setUserType } = useAppContext();`
  - Use `cn` util: `className={cn("p-2", isActive && "bg-blue-500")}`

If anything in these instructions is unclear or you want more specific examples (e.g., how API contract is structured, or where to add tests), tell me which area to expand and I will iterate.

---
Generated from repository files: `README.md`, `package.json`, `vite.config.ts`, `tsconfig.json`, `src/App.tsx`, `src/lib/app-context.tsx`, `src/lib/utils.ts`.
