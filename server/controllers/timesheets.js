const Timesheet = require('../../../db/models/Timesheet.js');

module.exports = {
  get: (req, res) => {
    const count = req.query.count ? req.query.count : 0;
    Timesheet.find(req.params.employee_id).sort({weekStart: 'desc'}).limit(count).exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  addOrEdit: (req, res) => {
    const {timesheet_id, employee_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, weekStart, weekEnd} = req.body;

    Timesheet.findByIdAndUpdate( timesheet_id, { ...(employee_id && {employee_id}), ...(monday && {monday}), ...(tuesday && {tuesday}), ...(wednesday && {wednesday}), ...(thursday && {thursday}), ...(friday && {friday}), ...(saturday && {saturday}), ...(sunday && {sunday}), ...(weekStart && {weekStart}), ...(weekEnd && {weekEnd}) }).exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  }

};