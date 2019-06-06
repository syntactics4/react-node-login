const express = require('express');
const router  = express.Router();
const usersController = require('../controllers/users');
const withAuth = require('../util/withAuth');

router.get('/users', withAuth, usersController.users);
router.post('/users', usersController.createUser);
router.patch('/users', withAuth, usersController.updateUser);
router.post('/authenticate', usersController.login);
router.post('/logout', withAuth, usersController.logout);

module.exports = router;