const { NoEmitOnErrorsPlugin } = require('webpack');

const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
};

const validateCheckIn = (value, { req }) => {
  if (value > req.query.checkOut) {
    throw new Error('Check-in date must be before the check-out date.');
  }
  return true;
}

module.exports = {
  validate,
  validateCheckIn,
};
