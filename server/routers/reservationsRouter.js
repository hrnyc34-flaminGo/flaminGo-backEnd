const router = require('express').Router();
const controller = require('../controllers');
const { reservationsRouterPermissions } = require('../middleware/authentication');

// router.use(reservationsRouterPermissions);

router.get('/', controller.reservations.get);
router.get('/availability/:date', controller.reservations.get);
router.post('/', controller.reservations.post);
router.put('/checkIn/reservation_id', controller.reservations.put);
router.put('/checkOut/:reservations_id', controller.reservations.put);
router.delete('/', controller.reservations.delete);

module.exports = router;
