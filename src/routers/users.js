const express = require('express');
const usersController = require('../controllers/users');
const usersRouter =express.Router();
// const validateMiddleware = require('../middleware/validation');
// const schema = require('../schemas/user');
usersRouter.post('/createUser',usersController.createUser);
usersRouter.post('/login',usersController.login);
usersRouter.get('/validateToken',usersController.validateToken);
module.exports=usersRouter;