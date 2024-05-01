const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDB = require("../database/userDB.js");
const developerDB = require("../database/developerDB.js")

const authController = {
	generateAccessToken: (id, role) => 
	{
		return jwt.sign(
			{
				id:		id,
				role:	role
			},
			process.env.JWT_ACCESS_TOKEN,
			{expiresIn: "1d"}
		)
	},
	login: async (req, res) =>
	{
		try
		{
			let username;
			let password;
			let userQueryId;
			let userQueryPassword;
			let	userQueryRole;
			let	validPassword;
			let accessToken;

			username = req.body.username || undefined;
			password = req.body.password || undefined;

			if (!username || !password)
				return res.status(401).json({message: "Invalid"});

			userQueryId = await userDB.getUserIdByUsername(username);
			userQueryPassword = await userDB.getPasswordByUsernameAndPassword(username);
			userQueryRole = await userDB.getRoleByUserId(userQueryId);

			validPassword = await bcrypt.compare(password, userQueryPassword);
			if (!validPassword)
				return res.status(401).json({message: "Wrong credentials"});

			accessToken = authController.generateAccessToken(userQueryId, userQueryRole);
			const {firstname, lastname, phone, email} = await developerDB.getDeveloperInfoByUserId(userQueryId);
			const jsonData =
			{
				fullname: firstname.concat(" ",lastname),
				phone: phone,
				email: email,
				redirect: "/dashboard"
			}
			res.cookie('accessToken', accessToken, {
				httpOnly: true,
				secure: true,
			});
			return res.status(200).json(jsonData)
		}
		catch(error)
		{
			console.log("Error in <login> function from <authController> controller");
			console.log(error)
			return res.status(500).json({message: "Error in login"});
		}
	},
	register: async (req, res) =>
	{
		try
		{
			let user_info = req.body.user_info || undefined;
			let username = user_info.username || undefined;
			let password = user_info.password || undefined;
			let firstname = user_info.firstname || undefined;
			let lastname = user_info.lastname || undefined;
			let phone = user_info.phone || undefined;
			let email = user_info.email || undefined;
			let address = user_info.address || undefined;
			let hash;
			let existedUser;
			let existedPhone;
			let existedEmail;
			
			if (!user_info || !username || !password)
				return res.status(401).json({message: "Missing information"});

			hash = bcrypt.hashSync(password, 10);

			existedUser = await userDB.getUserIdByUsername(username);
			if (existedUser)
				return res.status(401).json({message: "Username existed, please choose another one."});
			existedPhone = await userDB.getPhoneByUsername(username);
			if (existedPhone)
				return res.status(401).json({message: "Phone number existed, please choose another one."});
			existedEmail = await userDB.getEmailByUsername(username);
			if (existedEmail)
				return res.status(401).json({message: "Email existed, please choose another one."});
			const query = await userDB.createUser(username, hash, firstname, lastname, phone, email, address);
			res.status(200).json("Successfully registered");
		}
		catch(error)
		{
			console.log("Error in <register> function from <authController> controller");
			console.log(error)
			return res.status(500).json({message: "Error"});
		}
	}
}

module.exports = authController;