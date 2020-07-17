'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3030;
const agent = require('superagent')
const pg = require('pg');
const { query } = require('express');
const client = new pg.Client(process.env.DATABASE_URL)

server.use(express.static('./public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
server.use(methodOverride('_method'));

server.set('view engine','ejs');

server.get('/',getAllBooks);

function getAllBooks(req,res){
let sql = 'SELECT * FROM BOOK_LIST;';
client.query(sql).then((result)=>{
        res.render('./pages/index.ejs',{booksResult: result.rows});
});};


server.post('/searches',(req,res)=>{
    var searchKey = req.body.bookSearch;
    var searchFilter = req.body.searchType;
    let url;
    if (searchFilter == 'title'){
        url = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}+intitle`;
    }else{
        url = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}+inauthor`;
    }

agent.get(url)
.then(bookData =>{
    let result = bookData.body.items.map(element =>{
        return new Book(element)
    });
    res.render('./pages/searches/show',{booksResult: result });

});
});

server.get('/search/new',(req,res)=>{
    res.render('./pages/searches/new.ejs')
});

server.post('/book',saveBook);
function saveBook(req,res){
    let {bookname,bookauthor,bookdesc,bookimage,bookcat} = req.body;
    // console.log(req.body);
let safeValues = [bookname,bookauthor,bookdesc,bookimage,bookcat];
let qery = 'INSERT INTO BOOK_LIST (bookName,bookAuthor,bookDesc,bookImage,bookCat) VALUES($1,$2,$3,$4,$5);';
client.query(qery,safeValues).then(()=>{
    res.redirect('/');
});
};

server.get('/book/:book_id',getBookDTL);
function getBookDTL(req,res) {
    // console.log(req.params.book_id);
    let sqlQ = `select * from book_list where id =${req.params.book_id};`;
    client.query(sqlQ).then(result =>{
        // console.log(result);
        res.render('./pages/books/details.ejs',{bookDetails: result.rows[0]})
    })
}
function Book(data) {
    this.bookName = data.volumeInfo.title,
    this.bookAuthor = ((data.volumeInfo.authors) ? data.volumeInfo.authors[0] : 'unKnown')//data.volumeInfo.authors[0],
    this.bookDesc = data.volumeInfo.description,
    this.bookImage = ((data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg')
};

server.put('/update/:book_id',updateBook)
function updateBook(req,res) {
    let {bookname,bookauthor,bookdesc,bookimage,bookcat} = req.body;
    let sql = `UPDATE BOOK_LIST SET bookName=$1,bookAuthor=$2,bookDesc=$3,bookImage=$4,bookCat=$5 WHERE ID =$6;`;
    let safeValues = [bookname,bookauthor,bookdesc,bookimage,bookcat,req.params.book_id];
    client.query(sql,safeValues).then(()=>{
        res.redirect('/');
    })
}
server.delete('/delete/:book_id',deleteBook);
function deleteBook(req,res) {
    console.log('Deleted');
    let value = [req.params.book_id];
    let sql = 'DELETE FROM BOOK_LIST WHERE ID =$1;';
    client.query(sql,value).then(()=>{
        res.redirect('/');
    })
}
server.delete('/test',(req,res)=>{
    console.log('Hi this is tes');
})
server.get('/*',(req,res)=>{
    res.render('pages/error.ejs')
});
client.connect().then(()=>{
    server.listen(PORT,() =>{
        console.log(`listening to port : ${PORT}`);
});
});