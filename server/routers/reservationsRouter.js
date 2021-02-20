const router = require('express').Router();
const controller = require('../controllers');
//const { reservationsRouterPermissions } = require('../middleware/authentication');
const { query, body } = require('express-validator');
const { validate } = require('../middleware/validation');

// router.use(reservationsRouterPermissions);

router.get('/', [
  query('firstName').optional().escape(),
  query('lastName').optional().escape(),
  query('checkIn').optional().isISO8601(),
  query('checkOut').optional().isISO8601(),
  query('reservation_id').escape(),
],
validate,
controller.reservations.get);

router.get('/availability/:date', controller.reservations.getAvailability);

router.post('/', [
  body('bookingGuest').exists(),
  body('guestList').exists(),
  body('checkIn').isISO8601(),
  body('checkOut').isISO8601(),
  body('roomType').exists().escape()
], validate,
controller.reservations.post);

router.put('/checkIn/:reservation_id', controller.reservations.checkIn);
router.put('/checkOut/:reservation_id', controller.reservations.checkOut);

module.exports = router;
