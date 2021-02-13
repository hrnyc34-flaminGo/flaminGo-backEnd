const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.maintenance.get);
router.post('/', controller.maintenance.post);
router.put('/', controller.maintenance.put);
router.delete('/', controller.maintenance.delete);

module.exports = router;