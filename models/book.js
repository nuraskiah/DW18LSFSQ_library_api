'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Category, {
        foreignKey: {
          name: 'categoryId',
        },
        as: 'category',
      });
      Book.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
        },
        as: 'user',
      });
      Book.hasMany(models.Bookmark, {
        foreignKey: 'bookId',
        as: 'bookmarks',
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      publication: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      pages: DataTypes.INTEGER,
      isbn: DataTypes.STRING,
      about: DataTypes.TEXT,
      cover: DataTypes.STRING,
      file: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  return Book;
};
