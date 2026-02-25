## MANDATORY: Use td for Task Management

You must run td usage --new-session at conversation start (or after /clear) to see current work.
Use td usage -q for subsequent reads.

## Cursor Cloud specific instructions

This is a single-page React SPA (no backend, no database, no Docker).

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite, default port 5173) |
| Lint | `npm run lint` |
| Build | `npm run build` (runs `tsc -b && vite build`) |
| Preview prod build | `npm run preview` |

See `CLAUDE.md` for full project structure, styling conventions, and code style guidelines.

### Notes

- Node.js v22+ and npm v10+ are used. No `.nvmrc` or `engines` constraint exists.
- There are no automated tests (no test framework configured). Validation is done via lint, build, and manual browser testing.
- The dev server supports `--host 0.0.0.0` for external access: `npm run dev -- --host 0.0.0.0`.
- No environment variables or secrets are required.
