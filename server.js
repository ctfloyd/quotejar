const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let app = express();
app.set('vew engine', 'html');
app.use(bodyParser.urlencoded({ extended: true}));

router.post('/submit', (request, response) => {
    let quote = request.body.quote;
    let person = request.body.person;
    if(quote) {
        let database = new sqlite3.Database('quotes.db', sqlite3.OPEN_READWRITE, (err) => {
            if(err)
                console.log("Error connecting to the databse.");
        });
        database.run('INSERT INTO quotes(quote, person) VALUES(?, ?)', [quote, person], (err) => {
            if(err)
                console.log("Error inserting into table: ", err.message);
            console.log(`Row was added to the table.`);
        })
        database.close();
    }
    response.redirect('/');
});

router.get('/getQuote', (request, response) =>  {
    let database = new sqlite3.Database('quotes.db', sqlite3.OPEN_READONLY, (err) => {
        if(err)
            console.log("Error connecting to the database.");
    });
    database.get('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1;', (err, row) => {
        if(err)
            console.log("Error retrieving value from table.");
        response.json(row);
       //response.redirect('/');
    });
});

// Dispatch landing page, will have to handle post requests from here
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/views/landing.html'));
});

// Handle the 404 case, can dispatch custom page
router.get('*', (request, response) => {
    response.status(404);
    response.sendFile(path.join(__dirname+'/views/error.html'));
});


app.use('/', router);
app.listen(9000);