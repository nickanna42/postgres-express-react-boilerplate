// Require needed modules
const cluster = require('cluster');
const http = require('http');
const https = require('https');
const express = require('express');
const { engine: hbsEngine } = require('express-handlebars');
const CONFIG = require('./config');
const clusterManagement = require('./lib/clusterManagement');

// Start Cluster
if (cluster.isMaster) {
  clusterManagement.masterStart()
  .then(() => {
    for (let proc_counter = 0; proc_counter < CONFIG.NODE_CORES; proc_counter++) {
      cluster.fork();
    }
  });
} else {
  clusterManagement.forkStart()
  .then(() => {
    // Setup Express
    const app = express();
    app.set('case sensitive routing', false);
    app.set('strict routing', false);
    app.set('subdomain offset', 2);
    app.set('x-powered-by', false);
    app.set('env', CONFIG.NODE_ENV);

    // Setup Template Engine
    app.engine('.hbs', hbsEngine({
      'extname': '.hbs',
      'layoutsDir': 'views/layouts',
      'partialsDir': 'views/partials',
    }));
    app.set('view engine', '.hbs');

    // Configure Routing
    global.routes = require('./lib/objectifyRoutes.js')('./routes');
    if (CONFIG.NODE_ENV == 'production' && CONFIG.SSL_CERT && CONFIG.SSL_KEY) {
      app.use(routes.middleware.forceHTTPS);
    }
    app.use(express.static('public', {'extensions': ['html', 'htm'], index: 'index.html'}));
    require('./routes/index.js')(app);

    // Attach application to webserver
    const server = http.createServer(app);
    server.listen(CONFIG.HTTP_PORT, CONFIG.DOMAIN);
    console.log(`server started on ${CONFIG.DOMAIN}:${CONFIG.HTTP_PORT}`);
    
    if (CONFIG.NODE_ENV == 'production' && CONFIG.SSL_CERT && CONFIG.SSL_KEY) {
      const httpsOptions = {
        'key': CONFIG.SSL_CERT,
        'cert': CONFIG.SSL_KEY,
      };
      const secure_server = https.createServer(httpsOptions, app);
      secure_server.listen(CONFIG.HTTPS_PORT, CONFIG.DOMAIN);
      console.log(`https server started on ${CONFIG.DOMAIN}:${CONFIG.HTTPS_PORT}`);
    }
  });
}