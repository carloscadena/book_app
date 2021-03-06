'use strict';

const express = require('express');
const ejs = require('ejs');
require('dotenv').config()
const bookfetch = require('./bookfetch')
const PORT = process.env.PORT;
const app = express();

const superagent = require('superagent')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));


app.set('view engine', 'ejs');

app.get('/hello', (request, response) => {
  response.render('hello.ejs', {root: './public'});
});

app.get('/books', bookfetch.getBooks);

app.get('/books/addbook', (request, response) => {
  response.render('newBook');
});

app.get('/books/search', (request, response) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${request.query.searchforbook}`)
    .end( (err, apiResponse) => {
      let books = apiResponse.body.items.map(book => ({
        author: book.volumeInfo.authors[0],
        title: book.volumeInfo.title,
        isbn: book.volumeInfo.industryIdentifiers[0].identifier,
        image_url: book.volumeInfo.imageLinks.smallThumbnail,
        description: book.volumeInfo.description
      }))
      response.render('search', {books: books})
    })
})

app.get('/books/:id', bookfetch.getOneBook);

app.get('*', (request, response) => {
  response.statusCode = 404
  console.log(response.statusCode)
  response.render('error', {
    error: '404 - Wrong path'
  })
})


app.post('/books', bookfetch.addNewBook);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});