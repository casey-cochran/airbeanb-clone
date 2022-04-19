const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { Spot } = require('../../db/models');
const { Op } = require("sequelize");


router.post('/', asyncHandler(async(req,res) => {
    const {searchValue} = req.body;
    const value = await Spot.findAll({
        where: {
          name: {
            [Op.iLike]: '%' + searchValue + '%'
          }
        }
    })
    res.json(value)
}))




module.exports = router;
