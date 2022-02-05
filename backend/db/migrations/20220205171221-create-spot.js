'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}

      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unqiue: true
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(35)
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      lat: {
        type: Sequelize.DECIMAL,
        unique: true
      },
      lng: {
        type: Sequelize.DECIMAL,
        unique: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unqiue: true
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};
