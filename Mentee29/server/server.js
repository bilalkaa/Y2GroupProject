const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

var userRouter = require('./routes/user.js');
app.use('/users', userRouter);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
