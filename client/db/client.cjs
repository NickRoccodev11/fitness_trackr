const pg = require('pg') 
const { Client } = pg
 
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'fitness_trackr',
  user: 'nicholasrocco',
  password: 'PGpass123!',
});

module.exports= client;