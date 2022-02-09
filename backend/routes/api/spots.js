const express = require('express');
const asyncHandler = require('express-async-handler');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const {Spot, Image} = require('../../db/models');

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










module.exports = router;
