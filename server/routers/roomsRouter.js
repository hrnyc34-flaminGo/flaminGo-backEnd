const router = require('express').Router();
const controller = require('../controllers');
const   {checkJwt, checkHousekeepingPermissions, checkFrontDeskPermissions, checkManagerPermissions, checkAdminPermissions} = require ('../middleware/authentication');

router.get('/', checkHousekeepingPermissions, checkFrontDeskPermissions, checkManagerPermissions, checkAdminPermissions, controller.rooms.get);
router.get('/:room_id', checkHousekeepingPermissions, checkFrontDeskPermissions, checkManagerPermissions, checkAdminPermissions, controller.rooms.get);
router.get('/amenities', checkHousekeepingPermissions, checkFrontDeskPermissions, checkManagerPermissions, checkAdminPermissions, controller.rooms.get);
router.get('/types', checkHousekeepingPermissions, checkFrontDeskPermissions, checkManagerPermissions, checkAdminPermissions, controller.rooms.get);
router.post('/', checkManagerPermissions, checkAdminPermissions, controller.rooms.post);
router.put('/:room_id', checkManagerPermissions, checkAdminPermissions, controller.rooms.put);
router.delete('/', checkManagerPermissions, checkAdminPermissions, controller.rooms.delete);

module.exports = router;