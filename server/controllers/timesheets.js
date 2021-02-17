const Timesheet = require('../../db/models/Timesheet.js');

const getTimesheetsByEmployee = (employee_id, count) =>
  Timesheet.find({employee_id}).sort({weekStart: 'desc'}).limit(Number(count)).exec();

module.exports = {
  getTimesheetsByEmployee,
  get: (req, res) => {
    const { employee_id } = req.params;
    const count = req.query.count ? req.query.count : 0;
    getTimesheetsByEmployee(employee_id, count)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  },
  addOrEdit: (req, res) => {
    const {timesheet_id, employee_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body;

    const curr = new Date; // get current date
    const start = curr.getDate() - curr.getDay() + 1; // first day is Monday
    const end = start + 6; // last day is Sunday
    const weekStart = new Date(curr.setDate(start)).toISOString().slice(0, 10); //"2021-02-15"
    const weekEnd = new Date(curr.setDate(end)).toISOString().slice(0, 10); //"2021-02-21"

    const weekDays = {
      ...(monday && {monday}),
      ...(tuesday && {tuesday}),
      ...(wednesday && {wednesday}),
      ...(thursday && {thursday}),
      ...(friday && {friday}),
      ...(saturday && {saturday}),
      ...(sunday && {sunday}),
    };
    const weekHours = (Object.values(weekDays)).reduce((a, b) => a + b);
    const update = {
      ...weekDays,
      weekStart,
      weekEnd,
    };

    const options = {upsert: true, new: true};

    Timesheet.findOneAndUpdate({employee_id, weekStart}, {...update, weekHours}, options).exec()
      .then(result => {
        //Update weekHours parameter for Employee based on employee_id
        axios.patch(`https://${AUTH0_DOMAIN}/api/v2/users/${employee_id}`, {
          data: {user_metadata: {weekHours}}
        }, {
          headers: {
            Authorization: `Bearer ${MGMT_API_TOKEN}`,
          },
        })
          .then(() => {
            console.log(`Employee Weekly Hours Updated: ${weekHours}`);
          })
          .catch(err => {
            console.error('Failed to update Employee Weekly Hours after updating Timesheet.');
          });
        res.status(201).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  },
};
