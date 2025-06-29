# SpaceArkaders
Small experimental game about a paddle and some aliens

## High Score Backend

A simple Express server handles score submissions and commits them back to
`scores.json` using the GitHub API. Before running the server you must provide
the following environment variables:

- `GITHUB_TOKEN` – a personal access token with `repo` permissions
- `REPO_OWNER`  – GitHub username or organisation that owns the repo
- `REPO_NAME`   – name of the repository (e.g. `SpaceArkaders`)

Install dependencies and start the server:

```bash
npm install
node server.js
```

The game will send POST requests to `/submit-score` with `name` and `score`.
The server updates `scores.json` keeping only the top ten entries and commits
the change to the repository.

When deploying as a serverless function ensure these environment variables are
available and the endpoint path matches the one used in `index.html`.
