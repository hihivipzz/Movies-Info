const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);



const cn= require('./connectStr')

const db =pgp(cn);

module.exports = db;