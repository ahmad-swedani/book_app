DROP TABLE IF EXISTS BOOK_LIST;
CREATE TABLE IF NOT EXISTS BOOK_LIST(
    ID SERIAL PRIMARY KEY,
    bookName VARCHAR(255),
    bookAuthor VARCHAR(255),
    bookDesc TEXT,
    bookImage VARCHAR(255),
    bookCat VARCHAR(255)
    );
    -- INSERT INTO BOOK_LIST(bookName,bookAuthor,bookDesc,bookImage,bookCat) VALUES('what if','Ahmad Swedani','to know result what if you do some thing at that time','https://i.pinimg.com/originals/60/7b/98/607b98c81bfc9f55fbfe3580759afd92.jpg','psychic');