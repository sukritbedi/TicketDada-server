const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if(decoded.type===1){
      next();
    }
    else{
      if(decoded.userId === req.params.userID){
        next();
      }
      else{
        throw new Error('Auth Failed');
      }
    }
  } catch(error) {
    return res.status(401).json({
      message: 'Auth Failed'
    })
  }
};
