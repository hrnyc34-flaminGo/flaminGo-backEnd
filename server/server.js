const express = require('express');
const path = require('path');
const employeesRouter = require('./routers/employeesRouter');
const reservationsRouter = require('./routers/reservationsRouter');
const roomsRouter = require('./routers/roomsRouter');
const tasksRouter = require('./routers/tasksRouter');
const timesheetsRouter = require('./routers/timesheetsRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../flaminGo-frontEnd/client/dist')));

app.use('/employees', employeesRouter);
app.use('/reservations', reservationsRouter);
app.use('/rooms', roomsRouter);
app.use('/tasks', tasksRouter);
app.use('/timesheets', timesheetsRouter);

module.exports = app;
