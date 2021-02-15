const router = require('express').Router();
const controller = require('../controllers');
const {
  checkHousekeepingPermissions,
  checkAdminPermissions
} = require('../middleware/authentication');

router.get('/', checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.get);
router.post('/', checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.post);
router.put('/:task_id', checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.put);
router.delete('/', checkAdminPermissions, checkHousekeepingPermissions, controller.tasks.delete);


module.exports = router;