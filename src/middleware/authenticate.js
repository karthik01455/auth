const jwt = require('jsonwebtoken');
const {redisClient} = require('../utils/redis');
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  //   console.log(authHeader);
  const token = authHeader;
  //   console.log(token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, 'SECRET', async(err, tokenHeader) => {
    if (err) return res.sendStatus(403);
    const redisEmailId = await redisClient.get(token);
    if( toString (redisEmailId) === toString(tokenHeader.emailId) )
      req.body.emailId = tokenHeader.emailId;
    next();
  });
}
module.exports={authenticateToken};