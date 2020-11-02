'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          title: 'The A.B.C. Murders',
          author: 'Agatha Christie',
          publication: 'January 1952',
          categoryId: 4,
          userId: 1,
          pages: 324,
          isbn: '978006153673',
          about: 'murders',
          cover:
            'https://res.cloudinary.com/nuraskiah/image/upload/v1604229043/library/covers/cover-1604229042320.png',
          file: 'file-1604271675739.epub',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
