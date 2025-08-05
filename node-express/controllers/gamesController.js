const Game = require('../models/game');

const getGames = async (req, res) => {
  const games = await Game.find().exec();
  res.json(games);
}

const getGameById = async (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  const game = await Game.findOne({ id: gameId }).exec();
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
}

const addGame = async (req, res) => {
    const newGame = req.body;
    if (!newGame.title || !Array.isArray(newGame.platform)) {
        return res.status(400).json({ message: 'Title and platform are required' });
    }
    
    newGame.id = await Game.find().sort({ id: -1 }).limit(1).then(games => games.length > 0 ? games[0].id + 1 : 1);
    try {
        const createdGame = await Game.create(newGame);
        return res.status(201).json(createdGame);
    } catch (error) {
        console.error('Error creating game:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateGame = async (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  const game = await Game.findOne({id: gameId}).exec();
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  const {title, platform} = req.body;
  if (!title && !platform) {
    return res.status(400).json({ message: 'Title or platform are required' });
  }
  if (title) game.title = title.trim();
  if (platform && Array.isArray(platform)) game.platform = platform.map(p => p.trim());

 try {
    await game.save();
    return res.json(game);
  } catch (error) {
    console.error('Error updating game:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteGame =  async (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  try {
    const result = await Game.deleteOne({ id: gameId }).exec();
    if (result.deletedCount === 0) {  
      return res.status(404).json({ message: 'Game not found' });
    }
    return res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    getGames,
    getGameById,
    addGame,
    updateGame,
    deleteGame
};