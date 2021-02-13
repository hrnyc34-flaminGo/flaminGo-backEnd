const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.management.get);
router.post('/', controller.management.post);
router.put('/', controller.management.put);
router.delete('/', controller.management.delete);

module.exports = router;