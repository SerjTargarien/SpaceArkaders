# SpaceArkaders
Small experimental game about a paddle and some aliens

## High Score Backend

A simple Express server is included to persist high scores in `scores.json`. The
server exposes `POST /submit-score` and serves the static game files.

### Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Provide a GitHub token with permission to update this repository. Export the
   following environment variables before starting the server:
   ```bash
   export GITHUB_TOKEN=<your token>
   export REPO_OWNER=<github username or org>
   export REPO_NAME=SpaceArkaders
   ```
3. Start the server
   ```bash
   node server.js
   ```
   The game will be available at `http://localhost:3000`.

### How it Works
* `POST /submit-score` accepts JSON `{"name":"AAA","score":123}`.
* The handler fetches `scores.json` from GitHub, adds the new score, sorts the
  list and keeps the top 10 entries, then commits the updated file back using
  the `GITHUB_TOKEN`.
* `index.html` fetches `scores.json` from the root of the repository and submits
  scores to this endpoint when a game ends.
