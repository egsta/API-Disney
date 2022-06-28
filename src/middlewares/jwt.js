
const jwt = require('jsonwebtoken');

module.exports = 
 function checkJwt (req, res, next) {
  //console.log("checkJwt: ", req.headers['token'])
  
  const token = req.headers['token'];
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, process.env.SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    return res.status(401).json({ message: 'Not Authorized' });
  }

  const { userId, username } = jwtPayload;

  const newToken = jwt.sign({ userId, username }, process.env.SECRET, { expiresIn: '1h' });
  res.setHeader('token', newToken);
  // Call next
  next();
}
;


