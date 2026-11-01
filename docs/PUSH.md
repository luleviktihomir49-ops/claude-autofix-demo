# Push to GitHub + run the demo (Tihche, ~10 min)

## 1. Local check (Mac terminal)
```bash
cd ~/Desktop/projects2/claude-autofix-demo
npm install && npm test && npm run typecheck      # 9 tests green
git init -b main && git add -A && git commit -m "Booking quote module + headless Claude Code autofix/review pipeline"
```

## 2. Create the repo on GitHub (public — it's a portfolio piece)
github.com → New repository → name `claude-autofix-demo` → Public → Create (no README/.gitignore). Then:
```bash
git remote add origin https://github.com/<TVOJ-USERNAME>/claude-autofix-demo.git
git push -u origin main
```

## 3. Repo settings (one-time)
- Settings → Secrets and variables → Actions → New repository secret:
  - `ANTHROPIC_API_KEY` = клуч од console.anthropic.com  **или**
  - `CLAUDE_CODE_OAUTH_TOKEN` = резултат од `claude setup-token` во терминал (ако работиш со Claude Pro/Max претплата)
- Settings → Actions → General → Workflow permissions → **Read and write** + ☑ **Allow GitHub Actions to create and approve pull requests** → Save
- Issues → Labels → New label → `autofix`

## 4. Run it
- Issues → New issue → paste title + body from `docs/DEMO_ISSUE.md` → Submit → add label **autofix**
- Actions → Autofix → watch `fix` then `review`
- Expected in ~3–6 min: branch `autofix/issue-1`, PR "fix: …" with Before/After proof, review comment from the second agent.

## 5. If something fails
- "Resource not accessible by integration" on `gh pr create` → step 3 (PR creation permission) not enabled.
- Agent stops without PR → open the Actions log, read the last turns; usually the allowed-tools list blocked a command — tell Claude in the next session which command, we add it.
- Authentication error → secret name typo or token expired (`claude setup-token` again).

## 6. After it works
- Copy the PR URL into README "Proof" section (add a line under "Run the demo") and into `docs/UPWORK_ANSWER.md`.
- Merge the PR yourself (humans merge — that's the point).
