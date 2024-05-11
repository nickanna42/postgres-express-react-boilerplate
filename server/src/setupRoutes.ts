/**
*** Server routing instructions
**/
import express from 'express'
import { Express } from 'express';
import { default as routes } from './routes'

const setupRoutes = (app: Express) => {
    // Serve Static Files
    app.use(express.static('public', {'extensions': ['html', 'htm'], index: 'index.html'}));

    // App Route Logic
    // TODO PUT LOGIC HERE
    app.use('/api', routes.api);

    // Single-Page Application Page Server Logic
    // Must be last after API route
    app.use(routes.handleSPA);

    // Unhandled route exception
    app.use((_req, res) => {
        res.status(404).send('Not Found');
    });
};

export default setupRoutes