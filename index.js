const fs = require('fs');
const express = require('express')
const cors = require('cors')
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Setup documentation at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Avoid CORS errors in browsers
app.use(cors())

// Populate req.body
app.use(express.json())

// Serve the frontend
app.get('/', (req, res) => {

    // Read the index.html file and send it to the client
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.setHeader('content-type', 'text/html');
        res.send(html)
    });
})

// Configure dotenv to read .env vars into Node
require('dotenv').config()

// Save the port number from the .env file
let port = process.env.port;

// Start the server
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})