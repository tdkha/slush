const {pool} = require("./config.js");

const developerDB = 
{
	getDeveloperInfoByUserId: async (userId) =>
	{
		try
		{
			const query = `SELECT * FROM developers WHERE user_id = $1 `;
			const parameters = [userId]
			const result = await pool.query(query, parameters);
			return (result.rows[0]|| null);
		}
		catch(error)
		{
			console.log(`Error while querrying info from <developer> table`);
			return (null);
		}
	}
}

module.exports = developerDB