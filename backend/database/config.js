const pg = require("pg")
const { Pool } = pg
 
const pool = new Pool(
{
  	host: "localhost",
  	user: "postgres",
	password: "1234",
  	database: "slush",
	port: 5432,
});

module.exports = {pool};