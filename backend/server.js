const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({extended:false}));
let url =process.env.REACT_APP_API;
mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection= mongoose.connection;
connection.once('open',()=>{
    console.log("Server connection success");
});

const userRouter= require('./routes/user');
app.use('/users',userRouter);

app.listen(port,()=>{
    console.log("Server is running");
})