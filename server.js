const express = require('express');
const { Buffer } = require('buffer');

const app = express();
app.use(express.json());

const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME || 'SpaceArkaders';
const SCORES_FILE = 'scores.json';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!REPO_OWNER || !GITHUB_TOKEN) {
  console.error('REPO_OWNER and GITHUB_TOKEN must be set');
}

async function getScoresFromGitHub() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${SCORES_FILE}`;
  const res = await fetch(url, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github+json' }
  });
  if (!res.ok) throw new Error('Failed to fetch scores.json');
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString();
  return { scores: JSON.parse(content || '[]'), sha: data.sha };
}

async function updateScoresOnGitHub(scores, sha, name) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${SCORES_FILE}`;
  const content = Buffer.from(JSON.stringify(scores, null, 2)).toString('base64');
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github+json' },
    body: JSON.stringify({
      message: `Update scores for ${name}`,
      content,
      sha
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update scores: ${res.status} ${text}`);
  }
  return res.json();
}

app.post('/submit-score', async (req, res) => {
  const { name, score } = req.body;
  if (typeof name !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  try {
    const { scores, sha } = await getScoresFromGitHub();
    scores.push({ name, score, date: new Date().toISOString().split('T')[0] });
    scores.sort((a,b) => b.score - a.score);
    const top = scores.slice(0,10);
    await updateScoresOnGitHub(top, sha, name);
    res.json({ success: true, scores: top });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

app.use(express.static('.'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
