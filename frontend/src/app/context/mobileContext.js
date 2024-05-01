'use client'

import {createContext,useEffect, useState } from "react";

export const MobileContext = createContext();

/**
 * Description:
 * 			<mobileProvider> is wrapper (provider) component 
 * 			for regconizing the changes in size of a window.
 * Purpose: 
 * 			It ultimately define the layout for the website
 */
export default function	MobileProvider({children})
{
	const [windowSize, setWindowSize] = useState({
		w: 0,
		h: 0
	});

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const onchangeWindowSize = () => setWindowSize({w: window.innerWidth, h: window.innerHeight});

		window.addEventListener("resize", onchangeWindowSize);

		onchangeWindowSize();

		return () => window.removeEventListener("resize", onchangeWindowSize);
	}, []);

	useEffect(() => {
		if (windowSize.w < 500)
			setIsMobile(true);
		else
			setIsMobile(false);
	}, [windowSize]);

	return (
		<MobileContext.Provider value={children}>
			{children}
		</MobileContext.Provider>
	);
}
