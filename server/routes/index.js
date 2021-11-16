/**
*** Server routing instructions
**/
const express = require('express');

module.exports = function(app) {
    // JSON Request Body Processing
    app.use('/api', express.json());

    // App Route Logic
    // TODO PUT LOGIC HERE

    // Single-Page Application Page Server Logic
    // Must be last after API route
    app.use(routes.handleSPA);

    // Unhandled route exception
    app.use((_req, res) => {
        res.status(404).send('Not Found');
    });
};