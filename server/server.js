const express = require('express');
const path = require('path');
const employeesRouter = require('./routers/employeesRouter');
const reservationsRouter = require('./routers/reservationsRouter');
const roomsRouter = require('./routers/roomsRouter');
const tasksRouter = require('./routers/tasksRouter');
const timesheetsRouter = require('./routers/timesheetsRouter');
const { checkJwt } = require('./middleware/authentication');

// Authorization
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../flaminGo-frontEnd/client/dist')));
// app.use(checkJwt);

app.use('/employees', employeesRouter);
app.use('/reservations', reservationsRouter);
app.use('/rooms', roomsRouter);
app.use('/tasks', tasksRouter);
app.use('/timesheets', timesheetsRouter);

module.exports = app;
