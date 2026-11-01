# claude-autofix-demo

**A headless Claude Code pipeline that turns a bug report into a reviewed pull request — with no human in the loop until merge.**

```
issue labelled "autofix"  ──►  fix agent (Claude Code, headless)          ──►  pull request
                                 1. writes a NEW failing test                      with before/after
                                 2. fixes the root cause                            test output
                                 3. runs typecheck + tests
                                 4. opens the PR with proof
                                              │
                                              ▼
                               review agent (separate run, no shared memory)
                                 - re-runs tests
                                 - reverts the fix → proves the new test fails without it
                                 - checks scope, root cause, untouched tests
                                 - posts an independent review comment
```

Everything lives in the repo as plain code: [`.github/workflows/autofix.yml`](.github/workflows/autofix.yml) (both agents, prompts, allowed tools), [`CLAUDE.md`](CLAUDE.md) (conventions the agents follow), [`.github/workflows/ci.yml`](.github/workflows/ci.yml) (normal CI).

## Why this exists

Chat-driven coding agents are easy. The useful part is running them **unattended** — on an event, inside a sandboxed runner, with scoped permissions, with evidence attached to every change, and with a second agent that doesn't grade the first one's homework. This repo is the smallest honest version of that.

## The sample codebase

`src/booking.ts` — a tiny booking-quote module (nights between dates, long-stay discount, price quote) with Vitest tests. It ships with one real bug: `applyDiscount()` returns the discount amount instead of the discounted total. The existing tests don't cover a discounted stay, so CI is green — exactly how bugs reach production.

## Run the demo (≈ 5 minutes)

1. **Fork/clone**, then in GitHub → *Settings → Secrets and variables → Actions* add **one** of:
   - `ANTHROPIC_API_KEY` (Anthropic Console), or
   - `CLAUDE_CODE_OAUTH_TOKEN` (run `claude setup-token` locally with a Claude Pro/Max subscription).
2. *Settings → Actions → General → Workflow permissions*: **Read and write**, and tick **"Allow GitHub Actions to create and approve pull requests"**.
3. Create the label `autofix` (*Issues → Labels → New label*).
4. Open a new issue with the text from [`docs/DEMO_ISSUE.md`](docs/DEMO_ISSUE.md) and add the label **autofix**.
5. Watch *Actions → Autofix*. In a few minutes you get:
   - a branch `autofix/issue-<n>` with two commits (`test: …` then `fix: …`),
   - a PR whose body shows the new test **failing before** and **passing after**,
   - a review comment from the second agent with its own evidence.

Manual trigger: *Actions → Autofix → Run workflow* and paste any bug description.

## Guardrails

| Concern | How it's handled |
|---|---|
| Who can trigger it | Only users who can add labels (triage/write) or run workflows. Issue text is untrusted input — the prompt tells the agent to treat it as a bug report, nothing else. |
| What the agent can touch | `--allowedTools` whitelist: read/edit files, `npm test`, `git`, `gh pr create/comment`. No network beyond GitHub, no production data in the repo. |
| Blast radius | Runs on an ephemeral GitHub runner; pushes only to `autofix/*` branches; never merges. Humans merge. |
| Traceability | Full agent transcript in the Actions log; proof (test output) in the PR body; independent review as a PR comment. |
| Cost | `--max-turns` caps on both jobs; `timeout-minutes` on both jobs. A run on this repo is a few cents to a few tens of cents. |

## What I'd add next (and have scoped)

- **Trigger on CI failure** (`workflow_run` → failure on `main`): same agent, prompt seeded with the failing job log (`mcp__github_ci__download_job_log`).
- **Risk gate**: a small classifier step that labels the diff (migrations, auth, shared data, test coverage) and routes high-risk PRs to a human before the review agent.
- **QA evidence**: Playwright run with video/trace uploaded as artifacts and checked against acceptance criteria.
- **Intake**: turn rough bug reports into specs that point at the relevant code before the fix agent starts.
- **Learning loop**: when a bug slips through, an agent explains which check missed it and proposes a new test.

## Local

```bash
npm install
npm test          # 9 tests, all green (the discount bug is not covered yet — that's the point)
npm run typecheck
```

---
Built by Tihomir Junior Lulevik — AI agents, automation & apps · Claude Code daily · ElevenLabs · n8n · Supabase.
