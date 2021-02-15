const router = require('express').Router();
const controller = require('../controllers');
const {
  checkFrontDeskPermissions,
  checkAdminPermissions,
  checkHousekeepingPermissions,
  checkManagerPermissions
} = require('../middleware/authentication');

router.get('/', checkAdminPermissions, checkFrontDeskPermissions, checkHousekeepingPermissions, checkManagerPermissions, controller.employees.get);
router.put('/:timesheet_id', checkAdminPermissions, checkFrontDeskPermissions, checkHousekeepingPermissions, checkManagerPermissions, controller.employees.put);

module.exports = router;