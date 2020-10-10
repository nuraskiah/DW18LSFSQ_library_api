const { Book, Category, User } = require('../../models');
const Joi = require('joi');

exports.getBooks = async (req, res) => {
  try {
    const datas = await Book.findAll({
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
      message: 'Books data successfully fetched',
      data: datas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
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
      message: 'Book data successfully fetched',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
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
      message: 'Book successfully added',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
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
      return res.status(400).send({
        message: 'Book not found',
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
      message: `Book updated`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
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
      message: `Book with id ${id} successfully deleted`,
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
    });
  }
};
