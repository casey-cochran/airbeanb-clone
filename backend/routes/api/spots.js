const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Image, Booking } = require("../../db/models");

const router = express.Router();

router.get(
  "/spots",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({ include: Image });
    res.json(spots);
  })
);

const imageValidations = [
  check("url")
    .exists({ checkFalsy: true })
    .withMessage("Must provide an image URL")
    .isLength({ max: 255 })
    .withMessage("URL must not be more than 255 characters")
    .isURL()
    .withMessage("Must be a valid URL")
    .custom((value) => {
      return Image.findOne({ where: { url: value } }).then((imageUrl) => {
        if (imageUrl) {
          return Promise.reject("Image with this URL already exists.");
        }
      });
    }),
  handleValidationErrors,
];

router.post(
  "/spots",
  imageValidations,
  asyncHandler(async (req, res) => {
    const { url, spotId } = req.body;
    const img = { spotId, url };
    const newImage = await Image.create(img);
    res.json(newImage);
  })
);

router.get(
  "/spots/:spotId",
  asyncHandler(async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, { include: Image });
    res.json(spot);
  })
);

const bookingsValidator = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a start date")
    .isDate()
    .withMessage("Must be a valid date")
    .custom((value, { req }) => {
      const { userId } = req.body;
      return Booking.findOne({
        where: { userId: userId, startDate: value },
      }).then((booking) => {
        if (booking) {
          return Promise.reject("You already book a spot on this date");
        }
      });
    })
    .custom((value, { req }) => {
      const { userId, endDate, startDate } = req.body;
      return Booking.findAll({ where: { userId: userId } }).then((booking) => {
        if (booking) {
          for (let i = 0; i < booking.length; i++) {
            let book = booking[i];
            if (
              Number(startDate.split('-').join('')) <= Number(book.dataValues.endDate.split('-').join('')) &&
              Number(startDate.split('-').join('')) >= Number(book.dataValues.startDate.split('-').join(''))
            ) {
              return Promise.reject("Cannot reserve a spot during another reservation");
            }
          }
        }
      });
    })
    // .custom((value) => {
    //     console.log(value)
    //     let date = new Date();
    //     const currentDate = Number(date.toISOString().slice(0,10).split('-').join(''));
    //     const start = Number(value.split('-').join(''));
    //     console.log(start, currentDate)
    //     if(start < currentDate){
    //         throw new Error('is this working ? ')
    //     }

    // })
    ,
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("Must provide an end date")
    .isDate()
    .withMessage("Must be a valid date"),
  check("userId", "startDate", "spotId").custom((value, { req }) => {
    const { spotId } = req.body;
    return Booking.findOne({ where: { spotId: spotId, userId: value } }).then(
      (booking) => {
        if (booking) {
          if (Number(booking.dataValues.startDate.split('-').join('')) === Number(req.body.startDate.split('-').join(''))){
          return Promise.reject("Spot already booked on this date, Please choose another date");
            }
        }
      }
    );
  })
  .custom((value, { req }) => {
    const { userId, endDate, startDate } = req.body;
    return Booking.findAll({ where: { userId: userId } }).then((booking) => {
      if (booking) {
        for (let i = 0; i < booking.length; i++) {
          let book = booking[i];
          if (
            endDate <= book.dataValues.endDate &&
            endDate >= book.dataValues.startDate
          ) {
            return Promise.reject("Reservation end date conflicts with a previously booked spot");
          }
        }
      }
    });
  }),
  handleValidationErrors,
];

//TODO validators for this route
router.post(
  "/spots/:spotId",
  bookingsValidator,
  asyncHandler(async (req, res) => {
    const { startDate, endDate, userId, spotId } = req.body;
    newBooking = { startDate, endDate, userId, spotId };
    const booking = await Booking.create(newBooking);
    res.json(booking);
  })
);

module.exports = router;
