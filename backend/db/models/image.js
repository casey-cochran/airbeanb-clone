'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Spot, {foreignKey: 'spotId'})
  };
  return Image;
};
