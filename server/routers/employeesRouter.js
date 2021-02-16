const router = require('express').Router();
const controller = require('../controllers');
const { adminManagerPermissions } = require ('../middleware/authentication');

router.use(adminManagerPermissions);

router.get('/', controller.employees.get);
router.get('/:employee_id', controller.employees.get);
router.post('/', employees.post);
router.put('/:employee_id', controller.employees.put);
router.delete('/', controller.employees.delete);

module.exports = router;