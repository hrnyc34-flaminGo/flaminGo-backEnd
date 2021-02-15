const router = require('express').Router();
const controller = require('../controllers/index.js');

router.get('/employees', controller.employees.getAll);
router.get('/employees/:employee_id', controller.employees.getOne);
router.post('/employees', controller.employees.createOne);
router.put('/employees/:employee_id', controller.employees.editOne);
router.delete('/employees/:employee_id', controller.employees.removeOne);
// router.get('/employees/validate-token', controller.employees.get);
// router.get('/timesheets/:employee_id', controller.employees.get);
// router.post('/employees/authenticate-user', controller.employees.post);
// router.put('/timesheets/:timesheet_id', controller.employees.put);

module.exports = router;