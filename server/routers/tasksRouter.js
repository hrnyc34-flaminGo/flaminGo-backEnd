const router = require('express').Router();
const controller = require('../controllers');
const { taskRouterPermissions } = require('../middleware/authentication');

// router.use(taskRouterPermissions);

router.get('/', controller.tasks.get);
router.post('/', controller.tasks.post);
router.put('/:task_id', controller.tasks.put);

module.exports = router;