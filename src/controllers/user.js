const { User } = require('../../models');

exports.getUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      message: 'Users data has been successfully fetched',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      message: `User data has been successfully fetched`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error!',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `User with id ${id} has been deleted`,
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
