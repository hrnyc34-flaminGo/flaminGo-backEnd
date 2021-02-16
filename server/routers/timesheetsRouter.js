const router = require('express').Router();
const controller = require('../controllers');
const {
  adminManagerPermissions,
  allPermissions,
} = require('../middleware/authentication');

router.get('/', adminManagerPermissions, controller.employees.get);
router.put('/:timesheet_id', allPermissions, controller.employees.put);

module.exports = router;