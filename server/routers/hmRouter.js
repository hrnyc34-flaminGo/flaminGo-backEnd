const router = require('express').Router();
const controller = require('../controllers');

router.get('/reservations', controller.reservations.get);
router.post('/reservations', controller.reservations.post);
router.put('/reservations', controller.reservations.put);
router.put('/reservations/:guestId', controller.reservations.put);
router.delete('/reservations', controller.reservations.delete);

router.get('/rooms', controller.rooms.get);
router.post('/rooms', controller.rooms.post);
router.put('/rooms', controller.rooms.put);
router.put('/rooms/:reservationId', controller.rooms.put);
router.delete('/rooms', controller.rooms.delete);

router.get('/tasks', controller.tasks.get);
router.post('/tasks', controller.tasks.post);
router.put('/tasks', controller.tasks.put);
router.put('/tasks/:roomId', controller.tasks.put);
router.delete('/tasks', controller.tasks.delete);

router.get('/employees', controller.employees.get);
router.post('/employees', controller.employees.post);
router.put('/employees', controller.employees.put);
router.put('/employees/:employeeId', controller.employees.put);
router.delete('/employees', controller.employees.delete);

module.exports = router;