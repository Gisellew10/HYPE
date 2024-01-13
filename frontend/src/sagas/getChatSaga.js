import { GET, chatEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const getChatSaga = async (authToken, chatUpdate, onSuccess, onFailure) => {
    const response = await fetchCall(chatEndpoint, GET, { authToken });

    const data = await response.json();

    if (data.success) {
        chatUpdate(data.userChats);
        onSuccess(data);
    } else {
        onFailure(data);
    }
}