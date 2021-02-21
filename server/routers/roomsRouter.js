const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.rooms.getList);
router.get('/id/:room_id', controller.rooms.getById);
router.get('/amenities', controller.rooms.getAmenity);
router.get('/types', controller.rooms.getTypes);

router.post('/', controller.rooms.post);
router.post('/amenities', controller.rooms.post);
router.post('/types', controller.rooms.post);

router.put('/:room_id', controller.rooms.put);

module.exports = router;