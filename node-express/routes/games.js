const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const verifyToken = require('../middleware/verifyJWT');
const isAuthorized = require('../middleware/isAuthorized');
const permissions = require('../config/permissions');

router.route('/')
    .get(gamesController.getGames)
    .post(verifyToken, isAuthorized(permissions.CREATE_GAME), gamesController.addGame);
router.route('/:id')
    .get(gamesController.getGameById)
    .put(verifyToken, isAuthorized(permissions.UPDATE_GAME), gamesController.updateGame)
    .delete(verifyToken, isAuthorized(permissions.DELETE_GAME), gamesController.deleteGame);

module.exports = router;