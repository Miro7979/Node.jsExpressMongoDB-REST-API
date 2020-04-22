const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up express app
const app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/people',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

// static files
app.use(express.static('public'));

// Bring in body parser
app.use(bodyParser.json());
// init routes
app.use('/api', routes);

//error handling middleweare
app.use((err, req,res,next) => {
  res.status(422).send({error: err.message})
})

// Listen for Req
app.listen(process.env.port || 4000, () => {
  console.log('Now listening for Requests');
});