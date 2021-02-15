const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.employees.get);
router.put('/:timesheet_id', controller.employees.put);

module.exports = router;