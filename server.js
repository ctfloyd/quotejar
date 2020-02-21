const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

let app = express();
app.set('vew engine', 'html');
app.use(bodyParser.urlencoded({ extended: true}));

router.post('/submit', (request, response) => {
    let quote = request.body.quote;
    if(quote) {
        // Add to database
    }
    response.redirect('/');
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