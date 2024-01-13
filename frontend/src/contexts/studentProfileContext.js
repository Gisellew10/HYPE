import React, { useContext, useState } from "react";

const StudentContext = React.createContext();
const StudentContextUpdate = React.createContext();

export function useStudentProfileContext() { // rename this hook, import this hook to read the context
  return useContext(StudentContext);
}

export function useStudentProfileContextUpdate() { // rename this hook, import this hook to update the context
  return useContext(StudentContextUpdate);
}

export function StudentProfileContextProvider({ children }) { // rename this component and place it in globalContextProvider.js

    const [studentContext, setStudentContext] = useState({}); // replace "StudentContext" with the default value of the context
    
    function updateStudentContext(newStudentContext) {
        setStudentContext(newStudentContext);
    }
    
    return (
        <StudentContext.Provider value={studentContext}>
        <StudentContextUpdate.Provider value={updateStudentContext}>
            {children}
        </StudentContextUpdate.Provider>
        </StudentContext.Provider>
    );
}