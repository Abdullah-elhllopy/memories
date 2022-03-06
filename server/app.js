const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const post = require('./routes/post');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());


//router
app.use('/api/v1/posts',post);


app.all('*',(req,res,next)=>{
    next(new AppError(`Cant find ${req.originalUrl} on this server! `,404))
  })
  // when say next(appError) you mean running this function
app.use(globalErrorHandler)
  

module.exports = app