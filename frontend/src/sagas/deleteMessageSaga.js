import { DELETE, deleteMessageChatEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const deleteMessage = async (chatId, clickedMessageIndex, authToken, onSuccess, onFailure) => {
    const response = await fetchCall(deleteMessageChatEndpoint+'/'+ chatId, DELETE, { authToken, clickedMessageIndex});

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
