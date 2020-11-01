const { User } = require('../../models');

exports.getUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      status: 'success',
      message: 'Users fetched successfully',
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
      status: 'success',
      message: 'User fetched successfully',
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(
      {
        ...req.body,
        photo: req.file.path,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!updated)
      return res.status(404).send({
        status: 'fail',
        message: 'User not found!',
        code: 404,
      });

    const data = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      message: `User updated successfully`,
      data,
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
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
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};
