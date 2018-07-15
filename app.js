const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express(); //app is an object taking incoming http request and run respective code inside the express app.

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
mongoose.connect('mongodb://localhost/muber');
}

app.use(bodyParser.json());  //use middleware
routes(app);

//define and use a error handling middleware. only execute when next is called in drivers_controller
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
})


module.exports = app;
