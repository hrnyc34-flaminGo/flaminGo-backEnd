const router = require('express').Router();
const controller = require('../controllers');

router.get('/:employee_id', controller.timesheets.get);
router.put('/', controller.timesheets.addOrEdit);

module.exports = router;