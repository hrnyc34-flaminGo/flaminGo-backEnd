const router = require('express').Router();
const controller = require('../controllers');
const {
  checkHousekeepingPermissions,
  checkFrontDeskPermissions,
  checkManagerPermissions,
  checkAdminPermissions
} = require ('../middleware/authentication');

router.get('/', controller.rooms.get);
router.get('/:room_id', controller.rooms.get);
router.get('/amenities', controller.rooms.get);
router.get('/types', controller.rooms.get);

router.post('/', controller.rooms.post);
router.post('/amenities', controller.rooms.post);
router.post('/types', controller.rooms.post);

router.put('/:room_id', controller.rooms.put);
router.delete('/', controller.rooms.delete);

module.exports = router;