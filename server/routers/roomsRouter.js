const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.rooms.getRoomList);
router.get('/id/:room_id', controller.rooms.getRoomById);
router.get('/types', controller.rooms.getTypes);
router.get('/amenities', controller.rooms.getAmenity);

router.post('/', controller.rooms.addNewRoom);
router.post('/types', controller.rooms.addRoomType);
router.post('/amenities', controller.rooms.addAmenity);

router.put('/:room_id', controller.rooms.updateRoomInfo);

module.exports = router;
