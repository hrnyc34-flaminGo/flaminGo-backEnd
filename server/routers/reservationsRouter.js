const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.reservations.get);
router.get('/availability/:date', controller.reservations.getAvailibility);
router.post('/', controller.reservations.post);
router.put('/checkIn/:reservation_id', controller.reservations.checkIn);
router.put('/checkOut/:reservation_id', controller.reservations.checkOut);

module.exports = router;
