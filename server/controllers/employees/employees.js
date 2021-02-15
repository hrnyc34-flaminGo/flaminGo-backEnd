const Employee = require('../../../db/models/Employee.js');

module.exports = {
  getAll: (req, res) => {
    const isActive = req.query.isActive ? isActive : true;
    const firstName = req.query.searchName ? searchName.split(' ')[0] : null;
    const lastName = req.query.searchName ? searchName.split(' ')[1] : null;
    //firstName and lastName may not exist therefore using spread operator to conditionally add those properties if exists
    const query = {isActive, ...(firstName && {firstName}), ...(lastName && {lastName})};
    Employee.find(query).exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  getOne: (req, res) => {
    const { employee_id } = req.params;
    Employee.findOne({_id: employee_id}).exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  createOne: (req, res) => {
    //req.body = {firstName, lastName, address1, address2, city, state, zipcode, country, phone, email, wage, startDate, position}
    Employee.create({...req.body, weekHours: 0, isActive: true})
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })

  },

  editOne: (req, res) => {
    //req.body = {firstName, lastName, address1, address2, city, state, zipcode, country, phone, email, wage, startDate, position}
    Employee.findOneAndUpdate().exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.sendStatus(500);
      })
  },

  removeOne: (req, res) => {
    const { employee_id } = req.params;
    Employee.findOneAndDelete({ _id: employee_id }).exec()
      .then(result => {
        res.status(200).json(result);
      })
  }
};