const express = require('express');
const asyncHandler = require('express-async-handler');
const {setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const {User, Spot, Image} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const { db } = require('../../config');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


router.post('/', validateSignup, asyncHandler(async(req,res) => {
    const {email, password, username} = req.body;
    const user = await User.signup({email, username, password});

    await setTokenCookie(res, user);

    return res.json({user});
}))

const validatePost = [
  check('name')
    .exists({checkFalsy: true})
    .withMessage('Must provide a Spot name')
    .isLength({max: 50})
    .withMessage('Name must not be more than 50 characters')
    .custom((value) => {
      return Spot.findOne({where: {name: value}})
        .then((spotName) => {
          if(spotName){
            return Promise.reject('A spot with this name already exists')
          }
        })
    }),
  check('address')
    .exists({checkFalsy: true})
    .withMessage('Must provide an address')
    .isLength({max: 100})
    .withMessage('Address must not be more than 100 characters')
    .custom((value) => {
      return Spot.findOne({where: {address: value}})
        .then((spotAddress) => {
          if(spotAddress){
            return Promise.reject('A spot with this address already exists')
          }
        })
    }),
  check('city')
    .exists({checkFalsy: true})
    .withMessage('Must provide a city')
    .isLength({max: 70})
    .withMessage('City must not be more than 70 characters'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('Must provide a state')
    .isLength({max: 35})
    .withMessage('State must not be more than 35 characters'),
  check('zipCode')
    .exists({checkFalsy: true})
    .withMessage('Must provide an address')
    .isLength({min: 5, max: 5})
    .withMessage('Zipcode must be 5 characters in length')
    .isNumeric()
    .withMessage('Zipcode must be a number'),
  check('country')
    .exists({checkFalsy: true})
    .withMessage('Must provide a country')
    .isLength({max: 50})
    .withMessage('Country must not be more than 50 characters'),
  check('price')
    .exists({checkFalsy: true})
    .withMessage('Must provide a price')
    .isNumeric()
    .withMessage('Price be a valid number'),
    handleValidationErrors
]

router.post('/spots/new', validatePost, requireAuth, asyncHandler(async(req,res) => {
    const {name, address, city, state, zipCode, country, price, userId} = req.body;
    const newSpot = {name, address, city, state, zipCode, country, price, userId}

    const spot = await Spot.create(newSpot)
    res.json({spot});

}));

router.get('/:userId/spots', asyncHandler(async(req,res) => {
  const {userId }= req.params
  const spots = await Spot.findAll({where: {userId}, include:Image})
  res.json({spots});
}));

router.delete('/:userId/spots/delete', asyncHandler(async(req,res) => {
      const {userId} = req.params
      const {spotId} = req.body
      const spot = await Spot.findByPk(spotId, {where: {userId}, include: Image})
      await spot.destroy();
      res.json({msg: 'hello'})
}))

router.get('/:userId/spots/:spotId/edit', asyncHandler(async(req,res) => {
  const {userId, spotId} = req.params
  const spot = await Spot.findOne({where: {userId}, include: Image})
  console.log(spot, 'where are the images ???')
  res.json(spot)
}))

router.get('/:userId/spots/:spotId', asyncHandler(async(req,res) => {
  const {userId, spotId} = req.params
  const spot = await Spot.findByPk(spotId, {include: Image})
  // console.log(spot, 'where are the images ???')
  res.json(spot)
}))


const updatePost = [
  check('name')
    .exists({checkFalsy: true})
    .withMessage('Must provide a Spot name')
    .isLength({max: 50})
    .withMessage('Name must not be more than 50 characters'),
  check('address')
    .exists({checkFalsy: true})
    .withMessage('Must provide an address')
    .isLength({max: 100})
    .withMessage('Address must not be more than 100 characters'),
  check('city')
    .exists({checkFalsy: true})
    .withMessage('Must provide a city')
    .isLength({max: 70})
    .withMessage('City must not be more than 70 characters'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('Must provide a state')
    .isLength({max: 35})
    .withMessage('State must not be more than 35 characters'),
  check('zipCode')
    .exists({checkFalsy: true})
    .withMessage('Must provide an address')
    .isLength({min: 5, max: 5})
    .withMessage('Zipcode must be 5 characters in length')
    .isNumeric()
    .withMessage('Zipcode must be a number'),
  check('country')
    .exists({checkFalsy: true})
    .withMessage('Must provide a country')
    .isLength({max: 50})
    .withMessage('Country must not be more than 50 characters'),
  check('price')
    .exists({checkFalsy: true})
    .withMessage('Must provide a price')
    .isNumeric()
    .withMessage('Price be a valid number'),
    handleValidationErrors
]

router.patch('/:userId/spots/:spotId/edit', updatePost, asyncHandler(async(req,res) => {
  //const {userId, spotId} = req.params;
  const {name, address, city, state, zipCode, country, price, userId, spotId} = req.body;
  const update = {name, address, city, state, zipCode, country, price, userId, spotId}
  const spot = await Spot.findByPk(spotId)
  await spot.update(update)

  res.json(spot)

}))









module.exports = router;
