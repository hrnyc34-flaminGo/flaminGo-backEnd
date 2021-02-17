const router = require('express').Router();
const controller = require('../controllers');
const {
  checkManagerPermissions,
  checkAdminPermissions
} = require ('../middleware/authentication');

router.get('/', controller.employees.getAll);
router.get('/:employee_id', controller.employees.getOne);
router.post('/', controller.employees.createOne);
router.put('/:employee_id', controller.employees.editOne);
router.delete('/:employee_id', controller.employees.removeOne);
// router.post('/authenticate-user', controller.employees.post);
// router.get('/validate-token', controller.employees.get);

module.exports = router;