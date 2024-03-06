'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post); // Comments belong to a single post
    }
  }
  Comment.init({
    comment_text: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};