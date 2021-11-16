const CONFIG = {
    databaseUrl: {
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASS || 'develop',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT) || 5432,
    },
    dir: "migrations",
};

module.exports = CONFIG;