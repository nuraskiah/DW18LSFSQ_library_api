const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY;
const { User } = require('../../models');

exports.isAuth = (req, res, next) => {
  let authHeader, token;
  if (
    !(authHeader = req.header('Authorization')) ||
    !(token = authHeader.replace('Bearer ', ''))
  )
    return res.status(401).send({
      status: 'fail',
      message: 'You are unauthorized to access. Please log in.',
      code: 401,
    });

  try {
    const isTokenValid = jwt.verify(token, jwtKey);
    req.user = isTokenValid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: 'fail',
      message: 'Invalid Token',
      code: 401,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (user.role !== 'admin')
      return res.status(401).send({
        status: 'fail',
        message: 'You are unauthorized to access.',
        code: 401,
      });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: 'fail',
      message: 'Invalid Token',
      code: 401,
    });
  }
};
