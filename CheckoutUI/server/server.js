const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

let products = [];
let orders = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("API deployment successful");
});

app.post('/product', (req, res) => {
    const product = req.body;
    products.push(product);
    res.send('Product is added to the database');
});

app.get('/product', (req, res) => {
    res.json(products);
});

app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.delete('/product/:id', (req, res) => {
    const id = req.params.id;
    products = products.filter(product => product.id !== id);
    res.send('Product is deleted');
});

app.put('/product/:id', (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    products = products.map(product => {
        if (product.id === id) {
            return updatedProduct;
        } else {
            return product;
        }
    });
    res.send('Product is updated');
});

app.post('/checkout', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.redirect(302, 'https://assettracker.cf');
});

app.get('/checkout', (req, res) => {
    res.json(orders);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
