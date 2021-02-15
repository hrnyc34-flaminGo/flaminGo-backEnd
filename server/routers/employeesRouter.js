const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.employees.getAll);
router.post('/', controller.employees.createOne);
router.delete('/', controller.employees.removeOne);
router.get('/:employee_id', controller.employees.getOne);
router.put('/:employee_id', controller.employees.editOne);
// router.post('/authenticate-user', controller.employees.post);
// router.get('/validate-token', controller.employees.get);

module.exports = router;