const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const verifyToken = require('../middleware/verifyJWT');

router.route('/')
    .get(gamesController.getGames)
    .post(verifyToken, gamesController.addGame);
router.route('/:id')
    .get(gamesController.getGameById)
    .put(verifyToken, gamesController.updateGame)
    .delete(verifyToken, gamesController.deleteGame);

module.exports = router;