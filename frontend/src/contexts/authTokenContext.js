import React, { createContext, useContext, useState, useEffect } from "react";

const AuthTokenContext = createContext();
const AuthTokenContextUpdate = createContext();

export function useAuthTokenContext() {
	return useContext(AuthTokenContext);
}

export function useAuthTokenContextUpdate() {
	return useContext(AuthTokenContextUpdate);
}

export function AuthTokenContextProvider({ children }) {
	const [authToken, setAuthToken] = useState(() => {
		return localStorage.getItem("authToken") || "";
	});

	useEffect(() => {
		localStorage.setItem("authToken", authToken);
	}, [authToken]);

	function updateAuthToken(newAuthToken) {
		setAuthToken(newAuthToken);
	}

	return (
		<AuthTokenContext.Provider value={authToken}>
			<AuthTokenContextUpdate.Provider value={updateAuthToken}>
				{children}
			</AuthTokenContextUpdate.Provider>
		</AuthTokenContext.Provider>
	);
}
