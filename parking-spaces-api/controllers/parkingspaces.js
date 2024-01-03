const { ValidationError, CastError } = require('mongoose').Error;
const ParkingSpace = require('../models/parkingspace');
const { CREATED_STATUS } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const getParkings = (req, res, next) => {
  ParkingSpace.find()
    .then((parkings) => res.send(parkings))
    .catch(next);
};

const createParking = (req, res, next) => {
  ParkingSpace.create(req.body)
    .then((parking) => res.status(CREATED_STATUS).send(parking))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании парковочного пространства!'));
      }
      return next(err);
    });
};

const getParkingById = (req, res, next) => {
  ParkingSpace.findById(req.params.id)
    .orFail(new NotFoundError('Парковочное пространство с указанным id не найдено!'))
    .then((parking) => res.send(parking))
    .catch(next);
};

const updateParkingById = (req, res, next) => {
  ParkingSpace.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true, overwrite: true,
  })
    .orFail(new NotFoundError('Парковочное пространство с указанным id не найдено!'))
    .then((parking) => res.send(parking))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при изменении парковочного пространства!'));
      }
      return next(err);
    });
};

const deleteParking = (req, res, next) => {

};

module.exports = {
  getParkings,
  createParking,
  getParkingById,
  updateParkingById,
  deleteParking,
};
