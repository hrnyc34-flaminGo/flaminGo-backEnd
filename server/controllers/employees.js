const { AUTH0_DOMAIN, MGMT_API_TOKEN } = process.env;
const axios = require('axios');
const { getTimesheetsByEmployee } = require('./timesheets');

module.exports = {
  getAll: (req, res) => {
    const isActive = req.query.isActive ? req.query.isActive : true;
    const { searchName } = req.query;
    axios.get(`https://${AUTH0_DOMAIN}/api/v2/users`, {
      params: {
        q: searchName ? `name:*${searchName}*` : undefined,
        q: `user_metadata.isActive:${isActive}`,
      },
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(({ data }) => res.status(200).json(data.map((user) => ({
        id: user.user_id,
        name: user.name,
        email: user.email,
        ...user.user_metadata,
      }))))
      .catch(() => res.sendStatus(500));
  },

  getOne: (req, res) => {
    const { employee_id } = req.params;
    axios.get(`https://${AUTH0_DOMAIN}/api/v2/users/${employee_id}`, {
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(({ data: user }) => res.status(200).json(({
        id: user.user_id,
        name: user.name,
        email: user.email,
        ...user.user_metadata,
      })))
      .catch(() => res.sendStatus(500));
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
  },

  editOne: (req, res) => {
    const { employee_id } = req.params;
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
      wage,
      startDate,
      position,
      isActive,
    };

    const userMetadataLength = Object.values(userMetadata).filter((v) => v).length;

    let name;
    if (firstName && lastName) {
      name = `${firstName} ${lastName}`;
    }

    axios.patch(`https://${AUTH0_DOMAIN}/api/v2/users/${employee_id}`, {
      connection: 'Username-Password-Authentication',
      email,
      name,
      ...(userMetadataLength && { user_metadata: userMetadata }),
    }, {
      headers: {
        Authorization: `Bearer ${MGMT_API_TOKEN}`,
      },
    })
      .then(() => res.sendStatus(200))
      .catch((err) => res.sendStatus(500));
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
  }
};