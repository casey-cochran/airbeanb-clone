'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
     {spotId: 1, url: 'https://www.planetware.com/wpimages/2019/05/california-long-beach-top-rated-attractions-things-to-do-downtown-waterfront.jpg', createdAt: new Date(), updatedAt: new Date()},
     {spotId: 2, url: 'https://images.squarespace-cdn.com/content/v1/5e0e65adcd39ed279a0402fd/1627422658456-7QKPXTNQ34W2OMBTESCJ/1.jpg?format=2500w', createdAt: new Date(), updatedAt: new Date()},
     {spotId: 3, url: 'https://media4.manhattan-institute.org/sites/cj/files/venice-beach-homelessness-crisis.jpg', createdAt: new Date(), updatedAt: new Date()},
     //{spotId: 4, url: 'https://www.yachtsinternational.com/.image/t_share/MTQ2NDM4NTgwMTcxMzE4NzY1/njnewportbeach.jpg', createdAt: new Date(), updatedAt: new Date()},
     //{spotId: 5, url: 'https://media-cdn.tripadvisor.com/media/photo-s/1d/16/f0/7d/exterior-view.jpg', createdAt: new Date(), updatedAt: new Date()}
   ], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
