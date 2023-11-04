// Load the necessary modules
var express = require('express');
var app = express();
var fetch = require('node-fetch');

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Ensure views directory path is set correctly

// Serve static files (if you have any)
app.use(express.static(__dirname + '/public'));

// Routes

// Index page
app.get('/', function (req, res) {
    res.render('index', { products: null }); // Initially, pass null to products
});

// Listen on port 8081
app.listen(8081, function () {
    console.log('8081 is the magic port');
});
