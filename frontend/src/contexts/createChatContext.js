import React, { useContext, useState } from "react";

const CreateChatContext = React.createContext();
const CreateChatContextUpdate = React.createContext();

export function useCreateChatContext() {
  return useContext(CreateChatContext);
}

export function useCreateChatContextUpdate() { 
  return useContext(CreateChatContextUpdate);
}

export function CreateChatContextProvider({ children }) { 

  const [createChatContext, setCreateChatContext] = useState({});
  
  function updateCreateChatContext(newCreateChatContext) {
      setCreateChatContext(newCreateChatContext);
  }
  
  return (
      <CreateChatContext.Provider value={createChatContext}>
      <CreateChatContextUpdate.Provider value={updateCreateChatContext}>
          {children}
      </CreateChatContextUpdate.Provider>
      </CreateChatContext.Provider>
  );
}