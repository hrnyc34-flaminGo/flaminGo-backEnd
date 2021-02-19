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

// Authorization
const cors = require('cors');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if ('OPTIONS' === req.method) {
    return res.send(200);
  }
  next();
};

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(allowCrossDomain);
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../../flaminGo-frontEnd/client/dist')));
// app.use(checkJwt);

app.use('/employees', employeesRouter);
app.use('/reservations', reservationsRouter);
app.use('/rooms', roomsRouter);
app.use('/tasks', tasksRouter);
app.use('/timesheets', timesheetsRouter);

module.exports = app;