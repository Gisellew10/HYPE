import React, { useContext, useState } from "react";

const ChatContext = React.createContext();
const ChatContextUpdate = React.createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function useChatContextUpdate() { 
  return useContext(ChatContextUpdate);
}

export function ChatContextProvider({ children }) { 

  const [chatContext, setChatContext] = useState({});
  
  function updateChatContext(newChatContext) {
      setChatContext(newChatContext);
  }
  
  return (
      <ChatContext.Provider value={chatContext}>
      <ChatContextUpdate.Provider value={updateChatContext}>
          {children}
      </ChatContextUpdate.Provider>
      </ChatContext.Provider>
  );
}