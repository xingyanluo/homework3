// Load the necessary modules
var express = require('express');
var app = express();

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Ensure views directory path is set correctly

// Serve static files (e.g., CSS, JavaScript)
app.use(express.static(__dirname + '/public'));

// Routes

// Index page
app.get('/', function(req, res) {
    // You can use the 'fetch' method to get data from the API
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            // Process the data to select the relevant attributes
            const products = data.products.map(product => ({
                title: product.title,
                price: product.price,
                discountPercentage: product.discountPercentage
            }));

            res.render('index', {
                products: products
            });
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
