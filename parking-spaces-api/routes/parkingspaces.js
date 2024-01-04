const router = require('express').Router();

const {
  getParkings,
  createParking,
  updateParkingById,
  getParkingById,
  deleteParkingById,
} = require('../controllers/parkingSpaces');

router.get('/', getParkings);
router.post('/', createParking);
router.get('/:id', getParkingById);
router.patch('/:id', updateParkingById);
router.delete('/:id', deleteParkingById);

module.exports = router;
