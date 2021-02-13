const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.frontDesk.get);
router.post('/', controller.frontDesk.post);
router.put('/', controller.frontDesk.put);
router.delete('/', controller.frontDesk.delete);

module.exports = router;