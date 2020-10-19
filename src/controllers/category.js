const { Category } = require('../../models');
const Joi = require('joi');

exports.getCategories = async (req, res) => {
  try {
    const data = await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['name', 'ASC']],
    });
    res.send({
      status: 'success',
      message: 'Categories fetched successfully',
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

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      status: 'success',
      message: `Category fetched successfully`,
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

exports.addCategory = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        status: 'fail',
        message: error.details[0].message,
        code: 400,
      });

    const { id, name } = await Category.create(req.body);
    res.send({
      status: 'success',
      message: 'Category added successfully',
      data: {
        id,
        name,
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

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Category.update(req.body, {
      where: {
        id,
      },
    });

    if (!updated)
      return res.status(404).send({
        status: 'fail',
        message: 'Category not found!',
        code: 404,
      });

    const data = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      message: `Category updated successfully`,
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

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      message: 'Category deleted successfully',
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
