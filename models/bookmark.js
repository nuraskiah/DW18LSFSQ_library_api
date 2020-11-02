'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookmark.belongsTo(models.Book, {
        foreignKey: {
          name: 'BookId',
        },
        as: 'book',
      });
    }
  }
  Bookmark.init(
    {
      UserId: DataTypes.INTEGER,
      BookId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Bookmark',
    }
  );
  return Bookmark;
};
