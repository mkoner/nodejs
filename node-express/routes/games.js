const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

router.route('/')
    .get(gamesController.getGames)
    .post(gamesController.addGame);
router.route('/:id')
    .get(gamesController.getGameById)
    .put(gamesController.updateGame)
    .delete(gamesController.deleteGame);

module.exports = router;