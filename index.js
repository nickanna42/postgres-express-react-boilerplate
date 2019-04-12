// Require needed modules
require('dotenv').config();
const cluster = require('cluster');
const clusterManagement = require('./lib/clusterManagement');
const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const https = require('https');
const { readFileSync } = require('fs');

// Start Cluster
if (cluster.isMaster) {
  clusterManagement.masterStart()
  .then(() => {
    for (let proc_counter = 0; proc_counter < process.env.NODE_CORES; proc_counter++) {
      cluster.fork();
    }
  });
} else {
  // Setup Express
  const app = express();
  app.set('case sensitive routing', false);
  app.set('strict routing', false);
  app.set('subdomain offset', 2);
  app.set('x-powered-by', false);

  // Setup Template Engine
  app.engine('.hbs', exphbs({
    'extname': '.hbs',
    'layoutsDir': 'views/layouts',
    'partialsDir': 'views/partials',
  }));
  app.set('view engine', '.hbs');

  // Configure Routing
  global.routes = require('./lib/objectifyRoutes.js')('./routes');
  if (process.env.NODE_ENV == 'production' && process.env.CERT_NAME) {
    app.use(routes.middleware.forceHTTPS);
  }
  app.use(express.static('public', {'extensions': ['html', 'htm'], index: 'index.htm'}));
  require('./routes/index.js')(app);

  // Attach application to webserver
  const server = http.createServer(app);
  server.listen(process.env.HTTP_PORT, process.env.DOMAIN);
  if (process.env.NODE_ENV == 'production' && process.env.CERT_NAME) {
    const httpsOptions = {
      'pfx': readFileSync(process.env.CERT_NAME),
      'passphrase': ''
    };
    const secure_server = https.createServer(httpsOptions, app);
    secure_server.listen(443, process.env.DOMAIN);
  }

  console.log('server started');
}
