'use strict';

const pg = require('pg');

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', error => {
  console.error(error);
});

function getOneBook(request, response){
  let SQL = 'SELECT * FROM books WHERE id = $1';
  let values = [ request.params.id ]
  client.query(SQL, values, (err, result) => {
    if(err){
      console.log(err);
      response.redirect('/error');
    } else {
      response.render('show', {book: result.rows[0]});
    }
  })
}

function getBooks(request, response){
  client.query('SELECT * FROM books;')
    .then( (result) => {
      response.render('index', {
        books: result.rows
      })
    })
}

function addNewBook(request, response){
  let SQL = 'INSERT INTO books (author, title, isbn, image_url, description) VALUES ($1, $2, $3, $4, $5) RETURNING id;'
  let values = [
    request.body.author,
    request.body.title,
    request.body.isbn,
    request.body.image_url,
    request.body.description
  ];
  console.log(values)
  client.query(SQL, values, (err, result) => {
    console.log(result)
    response.redirect(`/books/${result.rows[0].id}`);
  })
}

module.exports = {
  getBooks: getBooks,
  getOneBook: getOneBook,
  addNewBook: addNewBook
};