const usersServices = require('../services/users');
async function createUser(req,res){
  try{
    console.log('controller');
    const {emailId,password} = req.body;
    const user = await usersServices.createUser(emailId,password);
    res.status(201).send(user);
  }
  catch(err){ 
    res.status(400).send(err);
  }   
}
async function login(req,res){
  try{
    const {emailId,password} = req.body;
    const user = await usersServices.login(emailId, password);
    console.log('user',user);
    res.status(201).send(user);

  }
  catch(err){   
    res.status(400).send(err);
  }
}
async function validateToken(req,res){
  try{
    const token = req.headers['authorization'];
    const emailId = await usersServices.validateToken(token);
    res.status(200).send(emailId);
  }
  catch(err){
    res.status(403).send(err);
  }

}
module.exports={createUser,login,validateToken};