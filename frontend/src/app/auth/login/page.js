"use client"
import React, { useEffect, useRef, useState } from "react"
import { useRouter} from 'next/navigation';
import {SERVER_URL} from "../../config.js"

export default function LoginComponent()
{
	const router = useRouter();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [success , setSuccess] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const errorRef = useRef();

	useEffect(() =>
	{
		setErrorMsg("");
	},[username, password]);

	const setLocalStorage = async (jsonData) =>
	{
		for (const element in jsonData)
		{
			if(element !== "redirect")
			{
			  localStorage.setItem(element,jsonData[element])
			} 
		}  
	}

	const handleSubmit = async (e) => 
	{
		e.preventDefault();
		setUserName(username.trim());
		setPassword(password.trim());

		if (!username || !password)
		{
			setErrorMsg("Invalid useraname or password")
			return (null);
		}
		try
		{
			let	response;
			let	jsonData;
			let	redirectPath;
			
			response = await fetch(`${SERVER_URL}/api/auth/login`,
				{
					method: "POST",
					credentials: "include",
					headers:
					{
				  		"Accept": "application/json",
				  		"Content-Type": "application/json"
					},
					body: JSON.stringify({username, password})
				}
			);
			jsonData = await response.json();

			if(!response.ok)
			{
				setErrorMsg(jsonData.message || "Something went wrong!");
				setTimeout(() => setErrorMsg(""),3000);
				return;
			}
			setLocalStorage(jsonData);
			redirectPath = jsonData.redirect;
			setTimeout( () => router.push(`${redirectPath}`), 3000)
		}
		catch(err)
		{
			setErrorMsg("Invalid");
		}
	};

	return (
		<div className="w-full lg:w-2/3">
			<form onSubmit={(e) => handleSubmit(e)}
			className="w-full h-full flex flex-col justify-center items-center bg-myglassblack py-12">
			<label className="lg:text-xl pb-8">SIGN IN TO YOUR ACCOUNT</label>
			<label htmlFor="username" className="relative right-20 text-sm text-left">Username:</label>
			<input type="text" id="username" name="username" onChange={(e) => setUserName(e.target.value)} className="bg-myglassblack mb-4 px-2"/>
			<label htmlFor="password" className="relative right-20 text-sm">Password:</label>
			<input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="bg-myglassblack mb-6 px-2"/>
			<p
              ref={errorRef}
              className={errorMsg ? "error-text text-sm" : "offscreen"} aria-live="assertive"
            >{errorMsg}</p>
			<input type="submit" className="bg-mylightgreen hover:bg-mygreen text-black font-bold py-2 px-4 rounded-lg " value={"SIGN IN"} />
			</form>
		</div>
	);
}
