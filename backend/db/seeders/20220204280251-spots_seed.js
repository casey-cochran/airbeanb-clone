'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
     {userId: 1, address: '1234 long beach', city: 'long beach', state: 'california', zipCode: 54321, country: 'usa', name: 'longB', price: 200, createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, address: '1234 santa monica', city: 'santa monica', state: 'california', zipCode: 54321, country: 'usa', name: 'santmonB', price: 500, createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, address: '1234 venice', city: 'venice', state: 'california', zipCode: 54321, country: 'usa', name: 'veniceB', price: 25, createdAt: new Date(), updatedAt: new Date()},
     //{userId: 4, address: '1234 newport', city: 'newport', state: 'california', zipCode: 54321, country: 'usa', name: 'newportB', price: 1000, createdAt: new Date(), updatedAt: new Date()},
     //{userId: 5, address: '1234 laguna', city: 'laguna', state: 'california', zipCode: 54321, country: 'usa', name: 'lagunaB', price: 5000, createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
