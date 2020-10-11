const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY;

exports.isAuth = (req, res, next) => {
  let authHeader, token;
  if (
    !(authHeader = req.headers.authorization) ||
    !(token = authHeader.replace('Bearer ', ''))
  )
    return res.status(401).send({
      status: 'fail',
      message: 'You are unauthorized to access. Please log in.',
      code: 401,
    });

  try {
    const isTokenValid = jwt.verify(token, jwtKey);
    req.user = isTokenValid.id;
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
