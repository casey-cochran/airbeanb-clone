'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
      unqiue: true
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    zipCode: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        len: [5,6]
      }
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL,
      unique: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      unique: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unqiue: true
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, {foreignKey: 'userId'})
    Spot.hasMany(models.Review, {foreignKey: 'spotId'})
    Spot.hasMany(models.Image, {foreignKey: 'spotId'})
    Spot.hasMany(models.Booking, {foreignKey: 'spotId'})

  };
  return Spot;
};
