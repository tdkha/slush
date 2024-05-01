const {pool} = require("./config.js");
 
const userDB = 
{
	getUserIdByUsername: async (username) => 
	{
		try
		{
			const query = `SELECT id FROM users WHERE username = $1 `;
			const parameters = [username]
			const result = await pool.query(query, parameters);
			return (result.rows[0].id || null);
		}
		catch(error)
		{
			console.log(`Error while querrying id from username: ${username}`);
			return (null);
		}
	},
	getPhoneByUsername: async (username) =>
	{
		try
		{
			const query = `SELECT phone FROM users WHERE username = $1 `;
			const parameters = [username]
			const result = await pool.query(query, parameters);
			return (result.rows[0].phone || null);
		}
		catch (error)
		{
			console.log(`Error while querrying phone from username: ${username}`);
			return (null);
		}
	},
	getEmailByUsername: async (username) =>
	{
		try
		{
			const query = `SELECT email FROM users WHERE username = $1 `;
			const parameters = [username]
			const result = await pool.query(query, parameters);
			return (result.rows[0].email || null);
		}
		catch (error)
		{
			console.log(`Error while querrying email from username: ${username}`);
			return (null);
		}
	},
	getPasswordByUsernameAndPassword: async (username) =>
	{
		try
		{
			const query = `SELECT password FROM users WHERE username = $1`;
			const parameters = [username]
			const result = await pool.query(query, parameters);
			return (result.rows[0].password || null);
		}
		catch (error)
		{
			console.log(`Error while querrying password from username: ${username}`);
			return (null);
		}
	},
	getRoleByUserId: async (userId) =>
	{
		try
		{
			const query = 
				`SELECT (SELECT title FROM roles WHERE id = role_id) AS "role" FROM user_roles WHERE user_id = $1`;
			const parameters = [userId]
			const result = await pool.query(query, parameters);
			return (result.rows[0].role || null);
		}
		catch (error)
		{
			console.log(`Error while querrying password from username: ${username}`);
			return (null);
		}
	},
	createUser : async (username, password, firstname, lastname, phone, email, address) =>
	{
		const client = await pool.connect();
		try
		{
			await client.query('BEGIN');

			const userInsertQuery = 
				`INSERT INTO users(username, password, created_at, updated_at) 
				VALUES($1, $2, current_date, current_date) 
				RETURNING id`;
			const userInsertParams = [username, password]
			const userInsertResult = await client.query(userInsertQuery, userInsertParams);
			const userId = userInsertResult.rows[0].id;

			const userRoleInsertQuery = 'INSERT INTO user_roles(user_id, role_id) VALUES($1, $2)';
   			const userRoleInsertParams = [userId, 2];
			await client.query(userRoleInsertQuery, userRoleInsertParams);

			const developerInsertQuery = 'INSERT INTO developers(firstname, lastname, phone, email, address, user_id) VALUES($1, $2, $3, $4, $5, $6)';
			const developerInsertParams = [firstname, lastname, phone, email, address, userId];
			await client.query(developerInsertQuery, developerInsertParams);

			await client.query('COMMIT');
		}
		catch (error)
		{
			console.log(`Error while inserting info to users`);
			await client.query('ROLLBACK');
			return (null);
		}
		finally
		{
			client.release();
		}
	}
}

module.exports = userDB;