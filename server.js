const express = require('express');
const app = express();
app.use(express.json());

const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
  console.error('Missing GITHUB_TOKEN, REPO_OWNER or REPO_NAME environment variables');
  process.exit(1);
}

const headers = {
  'Authorization': `token ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github+json'
};

async function getScores() {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/scores.json`, { headers });
  if (!res.ok) throw new Error('Failed to fetch scores');
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString();
  return { list: JSON.parse(content), sha: data.sha };
}

async function saveScores(list, sha) {
  const body = {
    message: 'Update high scores',
    content: Buffer.from(JSON.stringify(list, null, 2)).toString('base64'),
    sha
  };
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/scores.json`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to update scores');
}

app.post('/submit-score', async (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  try {
    const { list, sha } = await getScores();
    list.push({ name, score, date: new Date().toLocaleDateString() });
    list.sort((a, b) => b.score - a.score);
    await saveScores(list.slice(0, 10), sha);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
