import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSagas } from "../../sagas/sagaContext";
import { useCreateChatContext } from "../../contexts/createChatContext";
import {
	Input,
	ErrorLabel,
  MainButton
} from "./style";

function MessagePopup({chatname, othersUserId}) {

    const sagas = useSagas();

    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState(false);
    const history = useHistory();
    const chatId = useCreateChatContext();

    const fetchMessages = async () => {
      await sagas.updateChatMessageSaga(chatId, message, (data) => {
        console.log("success");
        history.push("/chat");
      }, (data) => {
        console.log("failure");
      });
    };

    useEffect(() => {
      if (chatId && message !== "") {
        fetchMessages();
      }
    }, [chatId]);

    const handleMessagePopup = () => {
      setMessageError(message === "");
  
      if (!(
        message === ""
      )) {
        sendMessage();
      }
    };
    const sendMessage = async () => {
      await sagas.createChat(chatname, othersUserId, (data) => {
        console.log("success");
      }, (data) => {
        console.log("failure");
      });
    };
    return (
        <>
        <Input
          type="text"
          placeholder="Send a message"
          value={message}
          message="message"
          onChange={(value) => setMessage(value.target.value)}
        />

        <MainButton onClick={handleMessagePopup}>Send</MainButton>
        {messageError && (<ErrorLabel>Please enter your message</ErrorLabel>)}
        </>
    );
  }
  
  export default MessagePopup;