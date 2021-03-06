const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Image, Booking, Review, User } = require("../../db/models");
const {requireAuth} = require('../../utils/auth')

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
  requireAuth,
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
  requireAuth,
  asyncHandler(async (req, res) => {
    const { startDate, endDate, userId, spotId } = req.body;
    newBooking = { startDate, endDate, userId, spotId };
    const booking = await Booking.create(newBooking);
    res.json(booking);
  })
);

router.get('/spots/:spotId/review', asyncHandler(async(req,res) => {
  const {spotId} = req.params;
  const reviews = await Spot.findByPk(spotId, {include: [{model: Review, include: User}, ]})
  res.json(reviews)
}))

const validateReview = [
  check("review")
    .exists({checkFalsy: true})
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage("Must provide a review between 1 and 500 characters"),
    check('rating')
    .exists({checkFalsy: true})
    // .isInt({min: 0, max: 5})
    .withMessage('Rating must be between 1 and 5'),
    handleValidationErrors
]


router.post('/spots/:spotId/review', requireAuth, validateReview, asyncHandler(async(req,res) => {
  const {userId, spotId, review, rating} = req.body;
  const newReview = {userId,spotId, review, rating};
  const sendReview = await Review.create(newReview);
  res.json(sendReview)
}))

const validateReviewEdit = [
  check("review")
    .exists({checkFalsy: true})
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage("Must provide a review between 1 and 500 characters"),
  check('rating')
    .exists({checkFalsy: true})
    // .isInt({min: 0, max: 5})
    .withMessage('Rating must be between 1 and 5'),
    handleValidationErrors

]


router.patch('/spots/:spotId/review/:reviewId/edit', requireAuth, validateReviewEdit, asyncHandler(async(req,res) => {
  const {review, rating, spotId, userId, reviewId} = req.body;
  const editReview = {review, rating, spotId, userId}
  const userReview = await Review.findByPk(+reviewId, {include: User});
  await userReview.update(editReview)
  res.json(userReview)
}))


router.delete('/spots/:spotId/review/:reviewId/delete', requireAuth, asyncHandler(async(req,res) => {
  const {reviewId} = req.params;
  const review = await Review.findByPk(+reviewId);
  await review.destroy();
  res.json({msg: 'success'});
}))


module.exports = router;
