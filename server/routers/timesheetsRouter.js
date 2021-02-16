const router = require('express').Router();
const controller = require('../controllers');
const {
  adminManagerPermissions,
  allPermissions,
} = require('../middleware/authentication');

router.get('/:employee_id', adminManagerPermissions, controller.timesheets.get);
router.put('/', allPermissions, controller.timesheets.addOrEdit);

module.exports = router;