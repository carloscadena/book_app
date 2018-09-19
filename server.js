'use strict';

const pg = require('pg');
const express = require('express');
const ejs = require('ejs');
require('dotenv').config()

const PORT = process.env.PORT;
const app = express();

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', error => {
  console.error(error);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));


app.set('view engine', 'ejs');

app.get('/hello', (request, response) => {
  response.render('hello.ejs', {root: './public'});
});

app.get('/books', (request, response) => {
  client.query('SELECT * FROM books;')
    .then( (result) => {
      response.render('index', {
        books: result.rows
      })
    })
})

app.get('/books/:id', (request, response) =>{
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
})

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