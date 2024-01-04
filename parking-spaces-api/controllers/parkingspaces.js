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
  const parkingId = req.params.id;
  const oldParking = req.body;

  ParkingSpace.findById(parkingId)
    .orFail(new NotFoundError('Парковочное пространство с указанным id не найдено!'))
    .then(() => {
      if (oldParking.availability !== 'conditionalFree') {
        oldParking.$unset = { schedule: 1 };
      }

      return ParkingSpace.findByIdAndUpdate(parkingId, oldParking, {
        new: true, runValidators: true,
      });
    })
    .then((parking) => res.send(parking))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при изменении парковочного пространства!'));
      }
      return next(err);
    });
};

const deleteParkingById = (req, res, next) => {
  ParkingSpace.findByIdAndDelete(req.params.id)
    .orFail(new NotFoundError('Парковочное пространство с указанным id не найдено!'))
    .then((parking) => res.send(parking))
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequestError('Передан некорректный id при удалении парковочного пространства!'));
      }
      return next(err);
    });
};

// const deleteParkingById = (req, res, next) => {
//   ParkingSpace.findById(req.params.id)
//     .orFail(new NotFoundError('Парковочное пространство с указанным id не найдено!'))
//     .then((parking) => ParkingSpace.deleteOne(parking).then(() => res.send(parking)))
//     .catch((err) => {
//       if (err instanceof CastError) {
//         return next(new BadRequestError('Передан некорректный id при удалении парковочного пространства!'));
//       }
//       return next(err);
//     });
// };

module.exports = {
  getParkings,
  createParking,
  getParkingById,
  updateParkingById,
  deleteParkingById,
};
