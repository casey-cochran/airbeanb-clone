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












module.exports = router;
