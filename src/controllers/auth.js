const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const jwtKey = process.env.JWT_KEY;

// --------------------------------LOGIN----------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const isExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!isExist)
      return res.status(400).send({
        message: 'Email or password is invalid',
      });

    const isValid = await bcrypt.compare(password, isExist.password);
    if (!isValid)
      return res.status(400).send({
        message: 'Email or password is invalid',
      });

    const token = jwt.sign({ id: isExist.id }, jwtKey);

    res.send({
      message: 'Login success!',
      data: {
        email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
