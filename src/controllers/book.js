const { Book, Category, User, Bookmark, sequelize } = require('../../models');
const Joi = require('joi');

exports.getBooks = async (req, res) => {
  try {
    const data = await Book.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId'],
      },
      order: [['id', 'DESC']],
    });
    res.send({
      status: 'success',
      message: 'Books fetched successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Book.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId'],
      },
      order: [
        ['status', 'ASC'],
        ['id', 'DESC'],
      ],
    });
    res.send({
      status: 'success',
      message: 'User books fetched successfully',
      data,
    });
  } catch (error) {}
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Book.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
        {
          model: Bookmark,
          as: 'bookmarks',
          attributes: ['userId'],
        },
      ],
      attributes: {
        exclude: ['categoryId', 'userId', 'createdAt', 'updatedAt'],
      },
    });
    res.send({
      status: 'success',
      message: 'Book fetched successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
      data: error,
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    // const schema = Joi.object().keys({
    //   title: Joi.string().required(),
    //   author: Joi.string().required(),
    //   publication: Joi.string().required(),
    //   categoryId: Joi.number().required(),
    //   userId: Joi.number().required(),
    //   pages: Joi.number().required(),
    //   isbn: Joi.string().required(),
    //   about: Joi.string().required(),
    //   cover: Joi.string(),
    //   status: Joi.string().required(),
    // });

    // const { error } = schema.validate(req.body);
    // if (error)
    //   return res.status(400).send({
    //     status: 'fail',
    //     message: error.details[0].message,
    //     code: 400,
    //   });

    const { id } = await Book.create({
      ...req.body,
      cover: req.files.cover[0].path,
      file: req.files.file[0].filename.split('/')[2],
    });

    const data = await Book.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId'],
      },
    });
    res.send({
      status: 'success',
      message: 'Book added successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
      data: error,
    });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Book.update(req.body, {
      where: {
        id,
      },
    });

    if (!updated)
      return res.status(404).send({
        status: 'fail',
        message: 'Book not found!',
        code: 404,
      });

    const data = await Book.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId'],
      },
    });

    res.send({
      status: 'success',
      message: `Book updated successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Book.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      message: `Book deleted successfully`,
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};
