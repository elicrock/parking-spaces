const router = require('express').Router();

const {
  getParkings,
  createParking,
  updateParkingById,
  getParkingById,
  deleteParking,
} = require('../controllers/parkingspaces');

router.get('/', getParkings);
router.post('/', createParking);
router.get('/:id', getParkingById);
router.put('/:id', updateParkingById);
router.delete('/:id', deleteParking);

module.exports = router;
