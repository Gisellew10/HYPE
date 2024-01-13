import React, { createContext, useContext, useState } from "react";

const StudentListContext = createContext([]);
const StudentListContextUpdate = createContext(() => {});

export function useStudentListContext() {
	const studentList = useContext(StudentListContext);
	return studentList;
}

export function useStudentListContextUpdate() {
	const updateStudentList = useContext(StudentListContextUpdate);
	return updateStudentList;
}

export function StudentListContextProvider({ children }) {
	const [studentList, setStudentList] = useState([]);

	function updateStudentList(newStudentList) {
		setStudentList(newStudentList);
	}

	return (
		<StudentListContext.Provider value={studentList}>
			<StudentListContextUpdate.Provider value={updateStudentList}>
				{children}
			</StudentListContextUpdate.Provider>
		</StudentListContext.Provider>
	);
}
