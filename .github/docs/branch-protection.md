# Branch protection (apply in GitHub repo settings)

Set these under **Settings → Branches → Add rule** for `main`:

- [x] Require a pull request before merging
  - [x] Require at least **1 approval**
  - [x] Require review from **Code Owners** (uses `.github/CODEOWNERS`)
- [x] Require status checks to pass before merging
  - Required checks: `Build (Next.js)`, `Analyze (javascript-typescript)` (CodeQL), `Gitleaks`
  - [x] Require branches to be up to date before merging
- [x] Restrict force pushes and deletions on `main`

## Repo-wide security settings (Settings → Code security and analysis)

- [x] Dependency graph
- [x] Dependabot alerts + security updates (config in `.github/dependabot.yml`)
- [x] Secret scanning + push protection
- [x] CodeQL advanced setup (workflow in `.github/workflows/codeql.yml`)
