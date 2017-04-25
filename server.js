const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error){
    console.log('Unnable to append to server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     title: 'Maintenance'
//   })
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    title: 'Home page',
    welcomeMessage: 'Welcome to the website!'
  })

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About page'
  });
});

app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'an error has ocurred an we can not fix it'
    });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs',{
    title: 'This is the projects page'
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
