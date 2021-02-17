const router = require('express').Router();
const controller = require('../controllers');
const {
  adminManagerPermissions,
  allPermissions,
} = require('../middleware/authentication');

//  adminManagerPermissions
router.get('/:employee_id', controller.timesheets.get);
// allPermissions
router.put('/', controller.timesheets.addOrEdit);

module.exports = router;