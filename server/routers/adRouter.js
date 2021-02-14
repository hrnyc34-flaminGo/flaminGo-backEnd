const router = require('express').Router();
const controller = require('../controllers');

router.get('/reservations', controller.reservations.get);
router.get('/reservations/availability/:date', controller.reservations.get);
router.post('/reservations', controller.reservations.post);
router.put('/reservations/checkIn/reservation_id', controller.reservations.put);
router.put('/reservations/checkOut/:reservations_id', controller.reservations.put);
router.delete('/reservations', controller.reservations.delete);

router.get('/rooms', controller.rooms.get);
router.get('/rooms/:room_id', controller.rooms.get);
router.get('/rooms/amenities', controller.rooms.get);
router.get('/rooms/types', controller.rooms.get);
router.post('/rooms', controller.rooms.post);
router.put('/rooms/:room_id', controller.rooms.put);
router.delete('/rooms', controller.rooms.delete);

router.get('/tasks', controller.tasks.get);
router.post('/tasks', controller.tasks.post);
router.put('/tasks/:task_id', controller.tasks.put);
router.delete('/tasks', controller.tasks.delete);

router.get('/employees', controller.employees.get);
router.get('/employees/:employee_id', controller.employees.get);
router.get('/employees/validate-token', controller.employees.get);
router.get('/timesheets/:employee_id', controller.employees.get);
router.post('/employees', controller.employees.post);
router.post('/employees/authenticate-user', controller.employees.post);
router.put('/employees/:employee_id', controller.employees.put);
router.put('/timesheets/:timesheet_id', controller.employees.put);
router.delete('/employees', controller.employees.delete);

module.exports = router;