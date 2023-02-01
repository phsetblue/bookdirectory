const express = require('express')
const bodyParser = require('body-parser');
const app = express()
// const port = 
const dotenv = require('dotenv');
dotenv.config()
const PORT = process.env.APP_PORT || 3000;
// const router = require('express').Router();
const books = require('./data');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get("/", (request, response) => {
    response.send("Hi there");
});

app.listen(PORT, () => {
    console.log("Listen on the port 3000...");
});


let booksDirectory = books;

app.get('/books', function(req, res) {
    res.sendFile('disp.html', {root: __dirname })
});

app.get('/data.json', function(req, res) {
    res.sendFile('data.json', {root: __dirname })
});


app.get('/books/:id', function (req, res) {
    const { id } = req.params;

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    res.render('bookdetails', {
        book:book
    });
});

