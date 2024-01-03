const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
// const { login, createUser, logout } = require('../controllers/users');

// const { validateCreateUser, validatelogin } = require('../middlewares/validation');

const parkingRouter = require('./parkingspaces');

router.use('/parking', parkingRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена!')));

module.exports = router;
