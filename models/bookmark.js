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
          name: 'book_id',
        },
        as: 'book',
      });
    }
  }
  Bookmark.init(
    {
      user_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Bookmark',
    }
  );
  return Bookmark;
};
