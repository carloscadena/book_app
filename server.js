'use strict';

const express = require('express');
const ejs = require('ejs');
require('dotenv').config()
const bookfetch = require('./bookfetch')
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));


app.set('view engine', 'ejs');

app.get('/hello', (request, response) => {
  response.render('hello.ejs', {root: './public'});
});

app.get('/books', bookfetch.getBooks);

app.get('/books/:id', bookfetch.getOneBook);

app.get('*', (request, response) => {
  response.statusCode = 404
  console.log(response.statusCode)
  response.render('error', {
    error: '404 - Wrong path'
  })

})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});