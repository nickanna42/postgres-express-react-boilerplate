/**
*** Server routing instructions
**/
import { resolve as pathResolve } from 'path'
import express from 'express'
import type { Express } from 'express';
import { default as routes } from './routes'

const setupRoutes = (app: Express) => {
  // Serve Static Files
  const staticFilesPath = pathResolve(__dirname, '../public');
  app.use(express.static(staticFilesPath, {'extensions': ['html', 'htm'], index: 'index.html'}));

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