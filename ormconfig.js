const url = require('url');

const dbConnParams = url.parse(process.env.DATABASE_URL);

module.exports = {
    type: 'mysql',
    host: dbConnParams.hostname,
    port: dbConnParams.port,
    username: dbConnParams.auth.substr(0, dbConnParams.auth.indexOf(':')),
    password: dbConnParams.auth.substr(dbConnParams.auth.indexOf(':') + 1, dbConnParams.auth.length),
    database: dbConnParams.pathname.substr(1),
    synchronize: false, // Very careful with this. It can broke database tables.
    logging: true,
    cache: true,
    entities: [__dirname + '/dist/domains/**/*.entity.js'],
    pool: {
        max: 10,
        min: 2,
        maxWaitingClients: 20,
    },
};
