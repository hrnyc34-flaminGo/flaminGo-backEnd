const router = require('express').Router();
const controller = require('../controllers');
const { adminManagerPermissions } = require ('../middleware/authentication');

// router.use(adminManagerPermissions);

router.get('/', controller.employees.getAll);
router.get('/:employee_id', controller.employees.getOne);
router.post('/', controller.employees.createOne);
router.put('/:employee_id', controller.employees.editOne);
router.delete('/:employee_id', controller.employees.removeOne);

module.exports = router;