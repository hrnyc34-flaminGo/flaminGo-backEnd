const router = require('express').Router();
const controller = require('../controllers');
const {
  checkHousekeepingPermissions,
  checkAdminPermissions,
  checkManagerPermissions
} = require('../middleware/authentication');

router.get('/', checkManagerPermissions, checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.get);
router.post('/', checkManagerPermissions, checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.post);
router.put('/:task_id', checkManagerPermissions, checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.put);
router.delete('/', checkManagerPermissions, checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.delete);


module.exports = router;