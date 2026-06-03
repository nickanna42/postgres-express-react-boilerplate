const CONFIG = require('./config');

// node-pg-migrate v8 is ESM-only and exposes a named `runner` export, so it is
// loaded via a dynamic import from this CommonJS entry point. Keeping this
// workspace CommonJS means the timestamped migration files in `migrations/`
// continue to load with their `exports.up`/`exports.down` syntax.
(async () => {
    const { runner } = await import('node-pg-migrate');

    await runner({
        ...CONFIG,
        direction: 'up',
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
