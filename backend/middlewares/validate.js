const jwt = require('jsonwebtoken');
require('dotenv').config();

const validate = (req, res, next) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) return res.status(401).send("Access token missing");
	return jwt.verify(
		accessToken,
		process.env.JWT_ACCESS_TOKEN,
		(err, decoded) => 
		{
			console.log(err)
			if (err)
				return res.status(401).send("Unauthorized");
			next()
		}
	);
}

module.exports = validate