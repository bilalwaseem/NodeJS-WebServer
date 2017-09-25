const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //key value pair
app.use(express.static(__dirname + '/public')); //middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append log file');
    }
  });

  next(); //enables the server to go the next statement, if this function is not called then the program will not execute any more
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

console.log('Starting server!');

app.get('/', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  // res.send({
  //   name: 'Bilal',
  //   likes: [
  //     'games',
  //     'money',
  //     'sex'
  //   ]
  // })

  res.render('home.hbs', {
    pageTitle: 'Home page',
    msg: 'Welcome to our website'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    error: '400',
    description: 'bad request'
  })
});


app.get('/bad', (req, res) => {
  res.send({
    error: '400',
    description: 'bad request'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
