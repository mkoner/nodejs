
const games = require('../models/games.json');

const getGames = (req, res) => {
  res.json(games);
}

const getGameById = (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  const game = games.find(g => g.id === gameId);
  
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
}

const addGame = (req, res) => {
    const newGame = req.body;
    if (!newGame.title || !Array.isArray(newGame.platform)) {
        return res.status(400).json({ message: 'Title and platform are required' });
    }
    
    newGame.id = games.length ? games[games.length - 1].id + 1 : 1;
    games.push(newGame);
    
    res.status(201).json(newGame);
}

const updateGame = (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  const index = games.findIndex(g => g.id === gameId);
  if (index === -1) {
    return res.status(404).json({ message: 'Game not found' });
  }
  const game = games[index];
  const {title, platform} = req.body;
  if (!title && !platform) {
    return res.status(400).json({ message: 'Title or platform are required' });
  }
  if (title) game.title = title.trim();
  if (platform && Array.isArray(platform)) game.platform = platform.map(p => p.trim());

  games[index] = game;
  
  res.json(game);
}

const deleteGame = (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  const index = games.findIndex(g => g.id === gameId);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  games.splice(index, 1);
  
  res.status(204).send();
}

module.exports = {
    getGames,
    getGameById,
    addGame,
    updateGame,
    deleteGame
};