const { Users } = require('../../database/models');
const bcrypt = require('bcryptjs');
const localStorage = require('localStorage');
const jwt = require('jsonwebtoken');
const redisUtil= require('../utils/redis');
const EXPIRATION_TIME_SECONDS=process.env.EXPIRATION_TIME_SECONDS;
const HTTPError = require('../utils/errors/HTTPError');
function generateAccessToken(userName) {
  return jwt.sign(userName, process.env.SECRET_KEY ?? 'SECRET', { expiresIn: '24h' });
}

async function createUser( emailId, password) {
   
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await Users.create({
    emailId,
    password: passwordHash
  });  
  return user;
  
}
  
async function login(emailId, password) { 
  const user = await Users.findOne({ where: { emailId } });
  console.log(user);
  if (!user) {
    throw new HTTPError('Invalid UserName');
  }

  if (await bcrypt.compare(password, user.password)) {
    console.log('password correct');
    const token = generateAccessToken({ emailId });

  
    // Store the JWT token in local storage
    // localStorage.setItem('jwtToken', token);
    
    try{const result= await redisUtil.redisClient.set(token, emailId, {
      'EX': EXPIRATION_TIME_SECONDS
    });
    console.log(result);
    console.log(token);
    return token;}
    catch(err)
    {
      console.log(err);
    }
    
    

  } else {
    throw new HTTPError('Invalid Password');
  }
}
async function validateToken(token) {
  const emailId = await redisUtil.redisClient.get(token);
  if (emailId) {
    return emailId;
  } else {
    throw new HTTPError('Invalid Token');
  }
}
module.exports = { login, createUser,validateToken };
