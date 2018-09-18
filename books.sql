CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(256),
  title VARCHAR(256),
  isbn INT(13),
  image_url VARCHAR(256),
  description VARCHAR(256),
);

DELETE FROM tasks;

INSERT INTO tasks (title, done) VALUES ('teach ejs lecture', FALSE);
INSERT INTO tasks (title, done) VALUES ('finish displaying things with ejs', FALSE);
INSERT INTO tasks (title, done) VALUES ('loops', FALSE);