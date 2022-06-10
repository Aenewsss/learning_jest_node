const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middeware/auth');

routes.post('/sessions', SessionController.store);

routes.get('/dashboard', authMiddleware, (req, res) => res.status(200).send());

module.exports = routes;