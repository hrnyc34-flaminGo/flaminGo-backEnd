const router = require('express').Router();
const controller = require('../controllers');
const {
  checkManagerPermissions,
  checkAdminPermissions
} = require ('../middleware/authentication');

router.get('/', checkManagerPermissions, checkAdminPermissions, controller.employees.get);
router.get('/:employee_id', checkManagerPermissions, checkAdminPermissions, controller.employees.get);
router.post('/', checkManagerPermissions, checkAdminPermissions, controller.employees.post);
router.put('/:employee_id', checkManagerPermissions, checkAdminPermissions, controller.employees.put);
router.delete('/', checkManagerPermissions, checkAdminPermissions, controller.employees.delete);

module.exports = router;