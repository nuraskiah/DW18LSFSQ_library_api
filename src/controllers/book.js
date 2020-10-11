const { Book, Category, User, sequelize } = require('../../models');
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
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'categoryId', 'userId'],
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
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      publication: Joi.string().required(),
      categoryId: Joi.number().required(),
      userId: Joi.number().required(),
      pages: Joi.number().required(),
      isbn: Joi.string().required(),
      about: Joi.string().required(),
      cover: Joi.string().required(),
      file: Joi.string().required(),
      status: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { id } = await Book.create({ ...req.body, bookmark: [] });

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

// --------------------------BOOKMARK---------------------------------

exports.getBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await sequelize.query(
      `SELECT * FROM books WHERE JSON_CONTAINS(bookmark, ${id})`
    );
    res.send({
      status: 'success',
      message: 'Bookmark fetched successfully',
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

exports.bookmark = async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    const book = await sequelize.query(
      `UPDATE books SET bookmark = JSON_MERGE(bookmark, ${userId}) WHERE id = ${bookId}`
    );

    const { id, title } = await Book.findOne({
      where: {
        id: bookId,
      },
    });

    res.send({
      status: 'success',
      message: 'Book bookmarked successfully',
      data: {
        id,
        title,
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

exports.unBookmark = async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    const book = await sequelize.query(
      `UPDATE books SET bookmark = JSON_REMOVE(bookmark, JSON_UNQUOTE(JSON_SEARCH(bookmark, 'one', ${userId})))
      WHERE id = ${bookId}`
    );

    const { id, title } = await Book.findOne({
      where: {
        id: bookId,
      },
    });

    res.send({
      status: 'success',
      message: 'Book deleted from bookmark successfully',
      data: {
        id,
        title,
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
