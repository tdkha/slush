"use client"
import React, { useEffect, useRef, useState } from "react"
import { useRouter, redirect } from 'next/navigation';
import {SERVER_URL} from "../../config.js"

export default function RegisterComponent()
{
	const router = useRouter();
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState(""); 
	const [success , setSuccess] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const errorRef = useRef();
	const firstnameRef = useRef();
	const lastnameRef = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();
	const addressRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = async (e) => 
	{
		e.preventDefault();
		if (!username.trim() || !password.trim())
		{
			setErrorMsg("Invalid username or password")
			return (null);
		}
		else if (!firstname)
		{
			setErrorMsg("Missing first name");
			return firstnameRef.current.focus();
		}
		else if (!lastname)
		{
			setErrorMsg("Missing last name");
			return lastnameRef.current.focus();
		}
		else if (!phone)
		{
			setErrorMsg("Missing phone number");
			return phoneRef.current.focus();
		}
		else if (!email)
		{
			setErrorMsg("Missing email");
			return emailRef.current.focus();
		}
		else if (!address)
		{
			setErrorMsg("Missing address");
			return addressRef.current.focus();
		}
		try
		{
			let	response;
			let	jsonData;
			const user_info = {
				firstname: firstname,
				lastname: lastname,
				phone: phone,
				email: email,
				address: address,
				username: username,
				password: password
			}
			response = await fetch(`${SERVER_URL}/api/auth/register`,
				{
					method: "POST",
					credentials: "include",
					headers:
					{
				  		"Accept": "application/json",
				  		"Content-Type": "application/json"
					},
					body: JSON.stringify({user_info})
				}
			);
			jsonData = await response.json();
			if(!response.ok)
			{
				setErrorMsg(jsonData.message);
				return (null);
			}
			setTimeout( () => router.push(`/`), 3000)
			return (jsonData)
		}
		catch(err)
		{
			setErrorMsg("Invalid");
		}
	};

	return (
		<div className="w-full lg:w-2/3">
			<form
			className="w-full h-full flex flex-col justify-center items-center bg-myglassblack py-12">
			<label className="lg:text-xl pb-8">REGISTER NEW ACCOUNT</label>
			<label htmlFor="firstname" className="relative right-20 text-sm text-left">First name:</label>
			<input type="text" id="firstname" name="firstname" ref={firstnameRef} className="rounded-md bg-myglassblack mb-4 px-2 border-2 outline-none focus:border-mygreen focus:text-mylightgreen" onChange={(e) => setFirstName(e.target.value)}/>
			<label htmlFor="lastname" className="relative right-20 text-sm text-left">Last name:</label>
			<input type="text" id="lastname" name="lastname" ref={lastnameRef} className="rounded-md bg-myglassblack mb-4 px-2  border-2 outline-none focus:border-mygreen focus:text-mylightgreen" onChange={(e) => setLastName(e.target.value)}/>
			<label htmlFor="email" className="relative right-24 text-sm text-left">Email:</label>
			<input type="text" id="email" name="email" ref={emailRef} className="rounded-md bg-myglassblack mb-4 px-2  border-2 outline-none focus:border-mygreen focus:text-mylightgreen" onChange={(e) => setEmail(e.target.value)}/>
			<label htmlFor="phone" className="relative right-16 text-sm text-left">Phone number:</label>
			<input type="text" id="phone" name="phone" ref={phoneRef} className="rounded-md bg-myglassblack mb-4 px-2  border-2 outline-none focus:border-mygreen focus:text-mylightgreen" onChange={(e) => setPhone(e.target.value)}/>
			<label htmlFor="address" className="relative right-[5.3rem] text-sm text-left">Address:</label>
			<input type="text" id="address" name="address" ref={addressRef} className="rounded-md bg-myglassblack mb-4 px-2  border-2 outline-none focus:border-mygreen focus:text-mylightgreen" onChange={(e) => setAddress(e.target.value)}/>
			<label htmlFor="username" className="relative right-20 text-sm text-left">Username:</label>
			<input type="text" id="username" name="username" ref={usernameRef} className="rounded-md bg-myglassblack mb-4 px-2  border-2 outline-none focus:border-mygreen focus:text-mylightgreen" onChange={(e) => setUserName(e.target.value)}/>
			<label htmlFor="password" className="relative right-20 text-sm">Password:</label>
			<input type="password" id="password" name="password" ref={passwordRef} className="rounded-md bg-myglassblack mb-6 px-2  border-2 outline-none focus:border-mygreen focus:text-mylightgreen" onChange={(e) => setPassword(e.target.value)}/>
			<p
              ref={errorRef}
              className={errorMsg ? "error-text text-sm" : "offscreen"} aria-live="assertive"
            >{errorMsg}</p>
			<button className="bg-mylightgreen hover:bg-mygreen text-black font-bold py-2 px-4 rounded-lg" onClick={(e) => handleSubmit(e)}>SUBMIT</button>
			</form>
		</div>
	);
}
