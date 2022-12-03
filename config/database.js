const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);



const cn={
    host: 'localhost',
    port: 5432,
    database: 'Movie',
    user: 'postgres',
    password: 'hieu123',
    max: 30 
}

const db =pgp(cn);

module.exports = db;