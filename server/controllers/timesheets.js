const Timesheet = require('../../db/models/Timesheet.js');

module.exports = {
  get: (req, res) => {
    const { employee_id } = req.params
    const count = req.query.count ? req.query.count : 0;
    Timesheet.find({employee_id}).sort({weekStart: 'desc'}).limit(Number(count)).exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  addOrEdit: (req, res) => {
    const {timesheet_id, employee_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body;

    const curr = new Date; // get current date
    const start = curr.getDate() - curr.getDay() + 1; // first day is Monday
    const end = start + 6; // last day is Sunday
    const weekStart = new Date(curr.setDate(start)).toISOString().slice(0, 10); //"2021-02-15"
    const weekEnd = new Date(curr.setDate(end)).toISOString().slice(0, 10); //"2021-02-21"

    const update = {...(monday && {monday}), ...(tuesday && {tuesday}), ...(wednesday && {wednesday}), ...(thursday && {thursday}), ...(friday && {friday}), ...(saturday && {saturday}), ...(sunday && {sunday}), ...(weekStart && {weekStart}), ...(weekEnd && {weekEnd}) }

    const options = {upsert: true, new: true}

    Timesheet.findOneAndUpdate({employee_id, weekStart}, update, options).exec()
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  }
}