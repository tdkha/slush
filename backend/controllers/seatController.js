const userDB = require("../database/userDB.js");
const seatDB = require("../database/seatDB.js");

const seatController =
{
	getSeats: async (req, res) =>
	{
		try
		{
			let seatQuery = await seatDB.getSeatInfo();
			let jsonData = [];

			seatQuery.forEach(row => 
			{
				const { row: rowNum} = row;
				const index = rowNum - 1;
				if (!jsonData[index])
					jsonData[index] = [];
				jsonData[index].push(row);
			});
			res.status(200).json(jsonData)
		}
		catch (error)
		{
			console.log("Error in <getSeats> function from <seatController> controller");
			console.log(error)
			return res.status(500).json({message: "Error in getting seat count"});
		}
	},
}

module.exports = seatController;