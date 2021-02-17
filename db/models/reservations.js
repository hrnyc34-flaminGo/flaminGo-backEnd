const mongoose = require("mongoose");
const { Schema, ObjectId, Mixed, Decimal128 } = mongoose;
const db = require("../../db");

const reservationsSchema = new Schema(
  {
    bookingGuest: { type: Object, required: true },
    room_id: { type: Mixed, default: "" },
    roomType_id: { type: ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guestList: { type: Array, default: [] },
    totalCost: { type: Decimal128, default: 0.0 },
  },
  {
    versionKey: false,
  }
);

reservationsSchema.statics.searchReservations = function (query = {}) {
  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: "rooms",
        localField: "room_id",
        foreignField: "_id",
        as: "room",
      },
    },
    {
      $lookup: {
        from: "roomtypes",
        localField: "roomType_id",
        foreignField: "_id",
        as: "roomTypeObj",
      },
    },
    {
      $set: {
        roomType: { $arrayElemAt: ["$roomTypeObj", 0] },
        roomNumber: { $ifNull: [{ $arrayElemAt: ["$room", 0] }, ""] },
      },
    },
    {
      $set: {
        roomNumber: "$roomNumber.roomNumber",
        roomType: "$roomType.roomType",
      },
    },
    {
      $project: {
        room: 0,
        roomTypeObj: 0,
      },
    },
  ];

  return this.aggregate(pipeline).sort({checkIn: -1});
};

const Reservation = mongoose.model("Reservation", reservationsSchema);

// Quick and dirty tests to make sure I can add and query the DB
// Reservation.find().limit(10).exec().then( res => console.log(res));
// let res = new Reservation(
//   {
//     bookingGuest: {
//       firstName: "Colin",
//       lastName: "Chauche",
//       phone: "123-456-7890",
//       email: "myemail@hotmail.com"
//     },
//     guestList:[
//       {
//         "firstName": "Guest",
//         "lastName": "One",
//         "phone": "123-456-7890",
//         "email": "guestOne@madeup.com"
//       }
//     ],
//     checkIn: "2021-02-18",
//     checkOut: "2021-02-24",
//     roomType: "Double Queen",
//     roomType_id: "602b118a541461fcab3686ac",
//     room_id: mongoose.Types.ObjectId("602b14fd541461fcab3686b5"),
//   }
// );
// res.save().then(res => console.log(res));

module.exports = Reservation;
