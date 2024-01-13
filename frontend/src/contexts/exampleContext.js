import React, { useContext, useState } from "react";

const ExampleContext = React.createContext();
const ExampleContextUpdate = React.createContext();

export function useExampleContext() { // rename this hook, import this hook to read the context
  return useContext(ExampleContext);
}

export function useExampleContextUpdate() { // rename this hook, import this hook to update the context
  return useContext(ExampleContextUpdate);
}

export function ExampleContextProvider({ children }) { // rename this component and place it in globalContextProvider.js

    const [exampleContext, setExampleContext] = useState("exampleContext"); // replace "exampleContext" with the default value of the context
    // note that "exampleContext" here and below MUST start with a lowercase letter, or the program will crash
    
    function updateExampleContext(newExampleContext) {
        setExampleContext(newExampleContext);
    }
    
    return (
        <ExampleContext.Provider value={exampleContext}>
        <ExampleContextUpdate.Provider value={updateExampleContext}>
            {children}
        </ExampleContextUpdate.Provider>
        </ExampleContext.Provider>
    );
}