DROP TABLE IF EXISTS booksdb;

CREATE TABLE IF NOT EXISTS booksdb (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    ISBN VARCHAR(255),
    image_url TEXT,
    description TEXT,
    bookshell VARCHAR(255),
    user_user VARCHAR(255)
);

INSERT INTO booksdb (author,title,image_url,description, user_user) VALUES('3madov','from the future', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo7qnvwvxl5KihCobp4tqiIshkaZj8YrRAeA&usqp=CAU',  'THIS IS A DRAFT', 'emad');
