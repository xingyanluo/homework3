// Load the necessary modules
var express = require('express');
var app = express();
var fetch = require('node-fetch');

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Ensure views directory path is set correctly

// Serve static files 
app.use(express.static(__dirname + '/public'));

// Routes

// Index page
app.get('/', function (req, res) {
    res.render('index', { products: null }); // Initially, pass null to products
});

// Add a new route for fetching products from the API
app.get('/getProducts', function (req, res) {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            const products = data.products.map(product => ({
                title: product.title,
                price: product.price,
                discountPercentage: product.discountPercentage,
                finalPrice: (product.price - (product.price * product.discountPercentage / 100)).toFixed(2),
                thumbnail: product.thumbnail
            }));

            res.json({ products }); // Send JSON response with products
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

// Listen on port 8081
app.listen(8081, function () {
    console.log('8081 is the magic port');
});
