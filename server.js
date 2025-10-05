const express = require('express');
const fs = require('fs');
const path = require('path');

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const app = express();
const PORT = 3000;

app.use(express.static('.'));

app.get('/api/games', (req, res) => {
  const gamesDir = path.join(__dirname, 'Games');
  const games = [];

  if (fs.existsSync(gamesDir)) {
    const folders = fs.readdirSync(gamesDir);
    folders.forEach(folder => {
      const indexPath = path.join(gamesDir, folder, 'index.html');
      if (fs.existsSync(indexPath)) {
        games.push({
          title: folder,
          entry: `/Games/${folder}/index.html`
        });
      } else {
        games.push({
          title: folder,
          entry: null
        });
      }
    });
  }

  res.json(games);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Game Launcher at http://localhost:${PORT}`);
});
