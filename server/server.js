const cors = require('cors');
const express = require('express');
const path = require('path');
const employeesRouter = require('./routers/employeesRouter');
const reservationsRouter = require('./routers/reservationsRouter');
const roomsRouter = require('./routers/roomsRouter');
const tasksRouter = require('./routers/tasksRouter');
const timesheetsRouter = require('./routers/timesheetsRouter');
const autoFeatures = require('./controllers/autoFeatures');
const { checkJwt } = require('./middleware/authentication');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

app.use('/employees', employeesRouter);
app.use('/reservations', reservationsRouter);
app.use('/rooms', roomsRouter);
app.use('/tasks', tasksRouter);
app.use('/timesheets', timesheetsRouter);

module.exports = app;