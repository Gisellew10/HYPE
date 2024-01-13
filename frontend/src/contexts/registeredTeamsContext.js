import React, { createContext, useContext, useState } from "react";

const RegisteredTeamsContext = createContext([]);
const RegisteredTeamsContextUpdate = createContext(() => {});

export function useRegisteredTeamsContext() {
	const registeredTeams = useContext(RegisteredTeamsContext);
	return registeredTeams;
}

export function useRegisteredTeamsContextUpdate() {
	const updateRegisteredTeams = useContext(RegisteredTeamsContextUpdate);
	return updateRegisteredTeams;
}

export function RegisteredTeamsContextProvider({ children }) {
	const [registeredTeams, setRegisteredTeams] = useState([]);

	function updateRegisteredTeams(newRegisteredTeams) {
		setRegisteredTeams(newRegisteredTeams);
	}

	return (
		<RegisteredTeamsContext.Provider value={registeredTeams}>
			<RegisteredTeamsContextUpdate.Provider value={updateRegisteredTeams}>
				{children}
			</RegisteredTeamsContextUpdate.Provider>
		</RegisteredTeamsContext.Provider>
	);
}
