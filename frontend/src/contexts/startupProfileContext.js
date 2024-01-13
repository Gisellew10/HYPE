import React, { useContext, useState } from "react";

const StartupContext = React.createContext();
const StartupContextUpdate = React.createContext();

export function useStartupProfileContext() { // rename this hook, import this hook to read the context
  return useContext(StartupContext);
}

export function useStartupProfileContextUpdate() { // rename this hook, import this hook to update the context
  return useContext(StartupContextUpdate);
}

export function StartupProfileContextProvider({ children }) { // rename this component and place it in globalContextProvider.js

    const [startupContext, setStartupContext] = useState({}); // replace "StartupContext" with the default value of the context
    
    function updateStartupContext(newStartupContext) {
        setStartupContext(newStartupContext);
    }
    
    return (
        <StartupContext.Provider value={startupContext}>
        <StartupContextUpdate.Provider value={updateStartupContext}>
            {children}
        </StartupContextUpdate.Provider>
        </StartupContext.Provider>
    );
}