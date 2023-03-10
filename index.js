const express = require('express');
const usersRouter = require('./src/routers/users');
const app = express();
const PORT = 8009;
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/users',usersRouter);
app.listen(PORT, () => {
  console.log(`Application Started in PORT: ${PORT}`);   
});