const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY;

exports.isAuth = (req, res, next) => {
  let authHeader, token;
  if (
    !(authHeader = req.headers.authorization) ||
    !(token = authHeader.replace('Bearer ', ''))
  )
    return res.status(403).send({
      message: 'Access Denied',
    });

  try {
    const isTokenValid = jwt.verify(token, jwtKey);
    req.user = isTokenValid.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({
      message: 'Invalid Token',
    });
  }
};
