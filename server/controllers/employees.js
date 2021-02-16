const Employee = require('../../db/models/Employee.js');
const { AUTH0_DOMAIN, MGMT_API_TOKEN } = process.env;
var axios = require('axios');

module.exports = {
  getAll: (req, res) => {
    // Add isActive filter
    const { searchName } = req.query;
    axios.get(`https://${AUTH0_DOMAIN}/api/v2/users`, {
      params: {
        q: searchName ? `name:*${searchName}*` : undefined,
      },
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(({ data }) => res.status(200).json(data.map((user) => ({
        name: user.name,
        email: user.email,
        ...user.user_metadata,
      }))))
      .catch(() => res.sendStatus(500));

    // const isActive = req.query.isActive ? false : true;
    // const firstName = searchName ? searchName.split(' ')[0] : null;
    // const lastName = searchName ? searchName.split(' ')[1] : null;
    // //firstName and lastName may not exist therefore using spread operator to conditionally add those properties if exists
    // const query = {...(firstName && {firstName}), ...(lastName && {lastName}, isActive)};
    // Employee.find(query).exec()
    //   .then(result => {
    //     res.status(200).json(result);
    //   })
    //   .catch(err => {
    //     res.sendStatus(500);
    //   })
  },

  getOne: (req, res) => {
    const { employee_id } = req.params;
    axios.get(`https://${AUTH0_DOMAIN}/api/v2/users/${employee_id}`, {
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(({ data }) => res.status(200).json(data))
      .catch(() => res.sendStatus(500));

    // const { employee_id } = req.params;
    // Employee.findOne({_id: employee_id}).exec()
    //   .then(result => {
    //     res.status(200).json(result);
    //   })
    //   .catch(err => {
    //     res.sendStatus(500);
    //   });
  },

  createOne: (req, res) => {
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipcode,
      country,
      phone,
      email,
      wage,
      startDate,
      position,
      weekHours,
    } = req.body;

    axios.post(`https://${AUTH0_DOMAIN}/api/v2/users`, {
      connection: 'Username-Password-Authentication',
      email,
      password: 'password123!',
      name: `${firstName} ${lastName}`,
      user_metadata: {
        address1,
        address2,
        city,
        state,
        zipcode,
        country,
        phone,
        wage,
        startDate,
        position,
        weekHours,
        isActive: true,
      },
    }, {
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(({ data }) => res.status(201).json(data))
      .catch((err) => { console.log(err); res.sendStatus(500); });

    // Employee.create(req.body)
    //   .then(result => {
    //     res.status(201).json(result);
    //   })
    //   .catch(err => {
    //     res.sendStatus(500);
    //   });
  },

  editOne: (req, res) => {
    const {
      employee_id,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipcode,
      country,
      phone,
      email,
      wage,
      startDate,
      position,
      isActive,
    } = req.body;

    const userMetadata = {
      address1,
      address2,
      city,
      state,
      zipcode,
      country,
      phone,
      email,
      wage,
      startDate,
      position,
      isActive,
    };

    const userMetadataLength = Object.values(userMetadata).filter((v) => v).length;

    axios.patch(`https://${AUTH0_DOMAIN}/api/v2/users/${employee_id}`, {
      name: `${firstName} ${lastName}`,
      ...(userMetadataLength && { user_metadata: userMetadata }),
    }, {
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(() => res.status(200))
      .catch(() => res.sendStatus(500));

    // const {employee_id, firstName, lastName, address1, address2, city, state, zipcode, country, phone, email, wage, startDate, position, isActive} = req.body;
    // Employee.findByIdAndUpdate( employee_id, { ...(firstName && {firstName}), ...(lastName && {lastName}), ...(address1 && {address1}), ...(address2 && {address2}), ...(city && {city}), ...(state && {state}), ...(zipcode && {zipcode}), ...(country && {country}), ...(phone && {phone}), ...(email && {email}), ...(wage && {wage}), ...(startDate && {startDate}), ...(position && {position}), ...(isActive && {isActive}) }, {new: true} ).exec()
    //   .then(result => {
    //     res.sendStatus(201)
    //   })
    //   .catch(err => {
    //     res.sendStatus(500);
    //   })
  },

  removeOne: (req, res) => {

    const { employee_id } = req.params;
    axios.delete(`https://${AUTH0_DOMAIN}/api/v2/users/${employee_id}`, {
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(({ data }) => res.status(200).json(data))
      .catch(() => res.sendStatus(500));

    // console.log(employee_id);
    // Employee.findByIdAndDelete(employee_id).exec()
    //   .then(result => {
    //     res.sendStatus(200);
    //   })
    //   .catch(err => {
    //     res.sendStatus(500);
    //   });
  }
};