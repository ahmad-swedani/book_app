'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3030;
const agent = require('superagent')

server.use(express.static('./public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine','ejs');

server.get('/',(req,res)=>{
    res.render('./pages/index.ejs');
});

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

function Book(data) {
    this.bookName = data.volumeInfo.title,
    this.bookAuthor = ((data.volumeInfo.authors) ? data.volumeInfo.authors[0] : 'unKnown')//data.volumeInfo.authors[0],
    this.bookDesc = data.volumeInfo.description,
    this.bookImage = ((data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg')
};

server.get('/*',(req,res)=>{
    res.render('pages/error.ejs')
});
server.listen(PORT,() =>{
console.log(`listening to port : ${PORT}`);
});