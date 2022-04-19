const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');
const searchRouter = require('./search');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/', spotsRouter);
router.use('/search', searchRouter)




module.exports = router;
