"use client"
import { useEffect, useState } from "react";
import { useRouter} from 'next/navigation';
import {SERVER_URL} from "../config.js";
import { document } from "postcss";

export default function DashboardComponent()
{
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [seatMap, setSeatMap] = useState([]);
	const [viewSelectedSeat, setviewSelectedSeat] = useState(false);
	const [viewSelectedSeatInfo, setviewSelectedSeatInfo] = useState([]);

	const router = useRouter();

	const fetchSeatMap = async () =>
	{
		let response;
		let jsonData;

		response = await fetch(`${SERVER_URL}/api/seat/map`,
			{
				method: "GET",
				credentials: "include",
			}
		);
		jsonData = await response.json();
		if (!jsonData)
			return router.refresh();
		setSeatMap(jsonData);
	}

	const handleSeatClick = (e) =>
	{
		let id = undefined;
		let index_row = undefined;
		let index_col = undefined;
		let foundSeatInfo = undefined;

		id = e.target.id;
		index_row = parseInt(id.substring(1,id.indexOf('c'))) - 1;
		index_col = parseInt(id.substring(id.indexOf('c') + 1)) - 1;

		console.log("Row :", index_row, " Col: ", index_col);

		let i = 0;
		let j = 0;
		while (i < seatMap.length)
		{
			j = 0;
			while (j < seatMap[i].length)
			{
				if (i == index_row && j == index_col && seatMap[i][j].state != "free")
				{
					foundSeatInfo = seatMap[i][j];
					break;
				}
				j++
			}
			i++;
		}
		console.log(foundSeatInfo)
		if (!foundSeatInfo)
		{
			setviewSelectedSeat(false);
			setviewSelectedSeatInfo([]);
			return;
		}
		setviewSelectedSeat(true);
		setviewSelectedSeatInfo(foundSeatInfo);
    };

	useEffect(() => 
	{
		const storedFullname = localStorage.getItem("fullname");
		const storedPhone = localStorage.getItem("phone");
		const storedEmail = localStorage.getItem("email");

		setFullname(storedFullname);
		setPhone(storedPhone);
    	setEmail(storedEmail);
		
		fetchSeatMap();
	}, []);
	return (
		<div className="w-full flex flex-col md:grid  md:grid-cols-3 gap-4  lg:w-2/3">
			<div className="bg-myglassblack py-4 px-8 flex flex-col gap-4 justify-center items-center">
				<div className="bg-mygreen w-40 h-40 rounded-full relative"></div>
				<iframe
					src="https://giphy.com/embed/ggpoVsIg0LwtHfTBEY"
					className="h-auto w-auto max-w-full absolute mb-4"
					allowFullScreen
				></iframe>
				<p className="text-mylightgreen">{fullname}</p>
			</div>
			<div className="col-span-2 bg-myglassblack flex flex-col gap-2 py-4 px-8 text-sm">
				<div className="text-xl md:pb-2 text-mylightgreen">Information:</div>
				<p>Phone: {phone}</p>
				<p>Email: {email}</p>
				<p>Location: Helsinki</p>
			</div>
			<div className="md:col-span-3 bg-myglassblack py-4 px-8">
				<div className="pb-4 text-xl text-mylightgreen">Seat Map:</div>
				<div className="w-full flex flex-col justify-center items-center gap-4">
					{seatMap.map((row, rowIndex) => (
						<div key={rowIndex + 1} className="flex gap-12 md:gap-24 lg:gap-36">
							<p>R{rowIndex + 1}</p>
							<div className="flex gap-1 text-center" onClick={(e) => handleSeatClick(e)}>
								{row.map(seat => (
									<div
										key={seat.seat_id}
										id={`r${seat.row}c${seat.col}`}
										className={`w-10 h-10 border-2 cursor-pointer ${
											seat.state == "taken" ? "bg-red-500 cursor-pointer" : ""
									}`}>
										{seat.col}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			{viewSelectedSeat && 
				<div className="md:col-span-3 bg-myglassblack flex flex-col gap-2 py-4 px-8 text-sm">
					<div className="text-xl pb-2 md:pb-4 text-mylightgreen">Selected user info:</div>
					<p>Name: {viewSelectedSeatInfo.firstname + viewSelectedSeatInfo.lastname}</p>
					<p>Phone: {viewSelectedSeatInfo.phone}</p>
					<p>Email: {viewSelectedSeatInfo.email}</p>
				</div>
			}
		</div>
	);
}