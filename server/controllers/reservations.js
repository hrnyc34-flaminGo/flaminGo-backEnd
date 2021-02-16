const Reservation = require('../../db/models/reservations');
const reformat = require('../helpers/reformat');

module.exports = {
  get: (req, res) => {
    Reservation.find().sort({checkIn: -1})
      .then((result) => {
        result.forEach((reservation) => {
          reservation.bookingGuest = reformat.guestToName(reservation.bookingGuest);
          reservation.guestList = reformat.guestListToNameList(reservation.guestList);
        });
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500);
      });
  },
  post: (req, res) => {

  },
  put: (req, res) => {

  },
  delete: (req, res) => {

  }
};
