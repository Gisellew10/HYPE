import { DELETE, chatEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const deleteChat = async (chatId, authToken, onSuccess, onFailure) => {
    const response = await fetchCall(chatEndpoint+'/'+ chatId, DELETE, { authToken });

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
