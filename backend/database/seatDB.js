const {pool} = require("./config.js");

const seatDB = 
{
	getAllRowCount: async () =>
	{
		try
		{
			const query = `SELECT row, COUNT(id) FROM seats GROUP BY row ORDER BY row`;
			const result = await pool.query(query);
			return (result.rows|| null);
		}
		catch(error)
		{
			console.log(`Error while querrying row count from <seats> table`);
			return (null);
		}
	},
	getSeatInfo: async () =>
	{
		try
		{
			const query = `SELECT s.id AS seat_id, s.col, s.row, s.state,
							d.firstname, d.lastname, d.phone, d.email, d.address
	 						FROM seats s
	 						LEFT JOIN developers d ON s.user_id = d.user_id`;
			const result = await pool.query(query);
			return (result.rows|| null);
		}
		catch(error)
		{
			console.log(`Error while querrying seat info from <seats> table`);
			return (null);
		}
	},
	getSeatInfoByUserId: async (userId) =>
	{
		try
		{
			const query = `SELECT s.id AS seat_id, s.col, s.row, s.state,
							d.firstname, d.lastname, d.phone, d.email, d.address
	 						FROM seats s
	 						LEFT JOIN developers d ON s.user_id = d.user_id
	 						WHERE s.user_id = $1`;
			const parameters = [userId]
			const result = await pool.query(query, parameters);
			return (result.rows[0]|| null);
		}
		catch(error)
		{
			console.log(`Error while querrying seat info from <seats> table`);
			return (null);
		}
	}
}

module.exports = seatDB;