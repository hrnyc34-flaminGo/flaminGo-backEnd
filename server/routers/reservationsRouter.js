const router = require('express').Router();
const controller = require('../controllers');
const {
  checkFrontDeskPermissions,
  checkAdminPermissions,
  checkManagerPermissions
} = require('../middleware/authentication');

router.get('/', checkAdminPermissions, checkManagerPermissions, checkFrontDeskPermissions, controller.reservations.get);
router.get('/availability/:date', checkManagerPermissions, checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.get);
router.post('/', checkManagerPermissions, checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.post);
router.put('/checkIn/reservation_id', checkManagerPermissions, checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.put);
router.put('/checkOut/:reservations_id', checkManagerPermissions, checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.put);
router.delete('/', checkManagerPermissions, checkAdminPermissions, checkFrontDeskPermissions, controller.reservations.delete);

module.exports = router;