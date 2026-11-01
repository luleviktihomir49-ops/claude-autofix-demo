# claude-autofix-demo — conventions for agents working in this repo

- TypeScript, ESM, Node 20. Tests: Vitest in `tests/`, source in `src/`. Run `npm test` and `npm run typecheck`.
- Test-first: a bug fix must come with a test that fails before the fix and passes after it.
- Keep changes minimal; fix root causes, not symptoms. Never weaken or delete existing tests.
- No new dependencies. Do not edit `.github/`, `package.json`, `tsconfig.json` unless the task is about them.
- Pure functions only in `src/booking.ts` — no I/O, no dates from `Date.now()`.
- PR bodies must show proof: test output before and after.
