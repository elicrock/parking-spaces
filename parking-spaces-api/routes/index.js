const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const parkingRouter = require('./parkingspaces');

router.use('/parkings', parkingRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена!')));

module.exports = router;
