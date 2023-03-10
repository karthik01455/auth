const { createClient } = require('redis');
const config = {
  socket: {
    host: 'docker.for.mac.localhost',
    port: 6379,
  },
};
const redisClient = createClient(config);
const redisConnection=redisClient.connect();
redisConnection.then(()=>{
  console.log('connected to redis');
  console.log(redisClient.isReady===true?'redis ready':'not ready');
});
module.exports={redisClient};