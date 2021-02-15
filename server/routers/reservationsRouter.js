const router = require('express').Router();
const controller = require('../controllers');
const {
  checkFrontDeskPermissions,
  checkAdminPermissions
} = require('../middleware/authentication');

router.get('/', checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.get);
router.get('/availability/:date', checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.get);
router.post('/', checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.post);
router.put('/checkIn/reservation_id', checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.put);
router.put('/checkOut/:reservations_id', checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.put);
router.delete('/', checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.delete);

module.exports = router;