const Pool = require('pg').Pool

const pool = new Pool({
    user: 'asrorbek',
    password: '12345',
    database: 'flower_market',
    host: 'localhost',
})

module.exports = pool