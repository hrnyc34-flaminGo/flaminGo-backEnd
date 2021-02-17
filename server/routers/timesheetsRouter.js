const router = require('express').Router();
const controller = require('../controllers');
const {
  checkFrontDeskPermissions,
  checkAdminPermissions,
  checkHousekeepingPermissions,
  checkManagerPermissions
} = require('../middleware/authentication');

router.get('/:employee_id', controller.timesheets.get);
router.put('/', controller.timesheets.addOrEdit);

module.exports = router;