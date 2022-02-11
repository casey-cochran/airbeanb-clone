const express = require('express');
const asyncHandler = require('express-async-handler');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const {Spot, Image, Booking} = require('../../db/models');

const router = express.Router();


router.get('/spots', asyncHandler(async(req,res) => {
    const spots = await Spot.findAll({include: Image})
    res.json(spots)
}))

const imageValidations = [
    check('url')
        .exists({checkFalsy: true})
        .withMessage('Must provide an image URL')
        .isLength({max: 255})
        .withMessage('URL must not be more than 255 characters')
        .isURL()
        .withMessage('Must be a valid URL')
        .custom((value) => {
            return Image.findOne({where: {url: value}})
                .then((imageUrl) => {
                    if(imageUrl){
                        return Promise.reject('Image with this URL already exists.')
                    }
                })
        }),
        handleValidationErrors
]

router.post('/spots', imageValidations, asyncHandler(async(req,res) => {
    const {url, spotId} = req.body;
    const img = {spotId, url}
    const newImage = await Image.create(img)
    res.json(newImage);
}))


router.get('/spots/:spotId', asyncHandler(async(req,res) => {
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId, {include: Image})
    res.json(spot);
}))

const bookingsValidator = [
    check('startDate')
        .exists({checkFalsy: true})
        .withMessage('Must provide a start date')
        .isDate()
        .withMessage('Must be a valid date'),
        // .custom((value) => {
        //     console.log(value, '-------')
        //     return Booking.findOne({where: {startDate: value, userId}})
        //     .then((bookingStart) => {
        //         if(bookingStart){
        //             return Promise.reject('You already have a spot booked on this date, Please choose another date')
        //         }
        //     })
        // }),
    check('endDate')
        .exists({checkFalsy: true})
        .withMessage('Must provide an end date')
        .isDate()
        .withMessage('Must be a valid date'),
    check('userId')
        .custom((value) => {
            //console.log(endDate, '-------')
            return Booking.findOne({where: {userId: value}})
            .then((booking) => {
                console.log(booking, '-----------')
                if(!booking.dataValues.startDate){
                    console.log(booking.dataValues.startDate, '------booking')
                    return Promise.reject('Already booked on this date')
                }
            })
        }),
        handleValidationErrors
];

// const validateDate = async(req,res,next) => {
//     const errors = [];

//     const { userId, startDate, endDate, spotId }= req.body;
//     const booking = await Booking.findOne({where: {userId, startDate }})
//     if(booking){
//         errors.push('already booked on this date')
//     }

//     if (errors.length > 0){
//         next(errors)
//     }
// }


//TODO validators for this route
router.post('/spots/:spotId', bookingsValidator, asyncHandler(async(req,res) => {
    const {startDate, endDate, userId, spotId} = req.body;
    newBooking = {startDate,endDate,userId,spotId}
    const booking = await Booking.create(newBooking);
    res.json(booking);

}))











module.exports = router;
