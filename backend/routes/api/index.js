const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/', spotsRouter);




module.exports = router;
