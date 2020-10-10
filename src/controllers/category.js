const { Category } = require('../../models');

exports.getCategories = async (req, res) => {
  try {
    const data = await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      message: 'Categories data successfully fetched',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
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
      message: `Category data successfully fetched`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { id, name } = await Category.create(req.body);
    res.send({
      message: 'Category successfully added',
      data: {
        id,
        name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
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
      return res.status(400).send({
        message: 'Category not found',
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
      message: `Category updated`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const Category = await Category.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `Category with id ${id} successfully deleted`,
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
