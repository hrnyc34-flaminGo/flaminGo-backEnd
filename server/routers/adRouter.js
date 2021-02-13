const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.admin.get);
router.post('/', controller.admin.post);
router.put('/', controller.admin.put);
router.delete('/', controller.admin.delete);

module.exports = router;