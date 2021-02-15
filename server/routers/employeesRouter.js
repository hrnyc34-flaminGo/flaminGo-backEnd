const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.employees.get);
router.get('/:employee_id', controller.employees.get);
router.get('/validate-token', controller.employees.get);
router.post('/', controller.employees.post);
router.post('/authenticate-user', controller.employees.post);
router.put('/:employee_id', controller.employees.put);
router.delete('/', controller.employees.delete);

module.exports = router;