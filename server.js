// Load the necessary modules
const express = require('express');
const app = express();
const axios = require('axios'); // Import Axios

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Ensure views directory path is set correctly

// Serve static files
app.use(express.static(__dirname + '/public'));

// Routes

// Index page
app.get('/', function (req, res) {
    res.render('index', { products: null });
});

// Add a new route for fetching products from the API
app.get('/getProducts', function (req, res) {
    axios.get('https://dummyjson.com/products')
        .then(response => {
            const data = response.data;
            const products = data.products.map(product => ({
                title: product.title,
                price: product.price,
                discountPercentage: product.discountPercentage,
                finalPrice: (product.price - (product.price * product.discountPercentage / 100)).toFixed(2),
                thumbnail: product.thumbnail
            }));

            res.json({ products });
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
