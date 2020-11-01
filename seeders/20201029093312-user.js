'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@library.com',
          password:
            '$2b$10$wU6wSvnsFQj76W1rCnl4ZOPdFHiNNNKsHTWuyHEEP1BldrWrAF4Ne',
          fullName: 'Administrator',
          gender: 'Other',
          phone: '000000000000',
          address: 'Indonesia',
          photo:
            'https://res.cloudinary.com/nuraskiah/image/upload/v1604094193/new-user.png',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
