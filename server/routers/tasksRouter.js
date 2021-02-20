const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.tasks.get);
router.post('/', controller.tasks.post);
router.put('/:task_id', controller.tasks.put);

module.exports = router;