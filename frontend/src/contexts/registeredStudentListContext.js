import React, { createContext, useContext, useState } from "react";

const RegisteredStudentListContext = createContext([]);
const RegisteredStudentListContextUpdate = createContext(() => {});

export function useRegisteredStudentListContext() {
	const registeredStudentList = useContext(RegisteredStudentListContext);
	return registeredStudentList;
}

export function useRegisteredStudentListContextUpdate() {
	const updateRegisteredStudentList = useContext(RegisteredStudentListContextUpdate);
	return updateRegisteredStudentList;
}

export function RegisteredStudentListContextProvider({ children }) {
	const [registeredStudentList, setRegisteredStudentList] = useState([]);

	function updateRegisteredStudentList(newRegisteredStudentList) {
		setRegisteredStudentList(newRegisteredStudentList);
	}

	return (
		<RegisteredStudentListContext.Provider value={registeredStudentList}>
			<RegisteredStudentListContextUpdate.Provider value={updateRegisteredStudentList}>
				{children}
			</RegisteredStudentListContextUpdate.Provider>
		</RegisteredStudentListContext.Provider>
	);
}
