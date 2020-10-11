const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const jwtKey = process.env.JWT_KEY;
const saltRounds = 10;

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
      return res.status(400).send({
        status: 'fail',
        message: error.details[0].message,
        code: 400,
      });

    const isExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!isExist)
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid email or password',
        code: 400,
      });

    const isValid = await bcrypt.compare(password, isExist.password);
    if (!isValid)
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid email or password',
        code: 400,
      });

    const token = jwt.sign({ id: isExist.id }, jwtKey);

    res.send({
      status: 'success',
      message: 'User logged in successfully!',
      data: {
        email,
        token,
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

// --------------------------------REGISTER----------------------------
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, gender, phone, address } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      fullName: Joi.string().min(3).required(),
      gender: Joi.string().min(4).required(),
      phone: Joi.string().min(6).required(),
      address: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        status: 'fail',
        message: error.details[0].message,
        code: 400,
      });

    const isExist = await User.findOne({
      where: {
        email,
      },
    });

    if (isExist)
      return res.status(400).send({
        status: 'fail',
        message: 'Your account already exist, please try to login',
        code: 400,
      });

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      ...req.body,
      password: hash,
    });

    const token = jwt.sign({ id: newUser.id }, jwtKey);

    res.send({
      status: 'success',
      message: 'Registration success!',
      data: {
        email,
        token,
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
