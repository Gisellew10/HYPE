import { POST, chatEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const createChatSaga = async (chatname, othersUserId, authToken, createChatUpdate, onSuccess, onFailure) => {
    const response = await fetchCall(chatEndpoint, POST, { chatname, othersUserId, authToken });

    const data = await response.json();

    if (data.success) {
        createChatUpdate(data.chatId);
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
