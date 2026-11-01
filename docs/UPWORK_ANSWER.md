# Upwork proposal — "AI Agent Developer: Claude Code / Codex Agents That Fix Code and Open Pull Requests" ($30–60/h)

Fill `<PR_URL>` and `<REPO_URL>` after the demo run. Rate: $45/h. Connects: 23.

## Q1: What's the most useful thing you've had a coding agent do without you watching?

Turn a bug report into a reviewed pull request while I wasn't at the keyboard.

I run Claude Code headless in GitHub Actions: an issue labelled "autofix" starts an agent that (1) writes a NEW failing test reproducing the report, (2) fixes the root cause, (3) runs typecheck + tests, (4) pushes a branch and opens a PR whose body contains the test output before and after. A second, separate agent run — no shared context — reverts the fix, proves the new test fails without it, checks scope and untouched tests, and posts an independent review. Humans merge.

Live example (repo, workflow, prompts, allowed-tools whitelist, PR with proof and the second agent's review): <REPO_URL> — PR: <PR_URL>

That covers your "main focus" almost line by line: event-triggered agents, failing test first, PR with evidence, separate reviewer, scoped permissions (allowed-tools whitelist, ephemeral runner, branch-only writes), and a traceable log per run.

## Q2: GitHub profile
https://github.com/<TVOJ-USERNAME>

## Cover letter

Hi,

Your "main focus" section is what I built this week to answer it properly: a headless Claude Code pipeline in GitHub Actions where an issue becomes a PR with a failing-test-first fix, before/after proof, and an independent review from a second agent — <REPO_URL>. Everything is plain code in the repo with a short README so your team can run it without me.

What I'd do first for you (weeks 1–2): wire the same pattern into your repo — triggers on failing CI and new bug reports, sandboxed runner, allowed-tools whitelist, no production data, per-run transcript as an artifact. Then the risk gate (migrations / auth / shared data → human first) and the review agent as a required check.

Where I'm honest about gaps: my production experience is TypeScript/React/Supabase apps and AI agents (ElevenLabs voice receptionist, Claude-powered booking assistant, n8n/Make automations). I have not run Kestra/Temporal/Airflow in production; OpenTelemetry I know from the reading side. Playwright, GitHub Actions, Docker, Postgres — yes.

Availability: 25–30 h/week, CET, overlapping US Eastern until 5 PM ET. $45/h.

Happy to walk you through the demo on a 15-minute call.

Tihomir
