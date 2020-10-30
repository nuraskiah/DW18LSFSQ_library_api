'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Fantasy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sci-Fi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Documentary',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mystery',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
