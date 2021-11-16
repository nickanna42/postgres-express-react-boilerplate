const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NODE_CORES: parseInt(process.env.NODE_CORES) || 1,
  SSL_KEY: process.env.SSL_KEY,
  SSL_CERT: process.env.SSL_CERT,
  HTTP_PORT: parseInt(process.env.HTTP_PORT) || 5000,
  HTTPS_PORT: parseInt(process.env.HTTPS_PORT) || 443,
  DOMAIN: process.env.DOMAIN,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASS: process.env.DB_PASS || 'develop',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT) || 5432,
};

module.exports = CONFIG;