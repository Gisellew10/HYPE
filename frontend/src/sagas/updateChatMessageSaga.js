import { PUT, chatEndpoint} from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const updateChatMessageSaga = async (chatId, message, authToken,onSuccess, onFailure) => {
    const response = await fetchCall(chatEndpoint+'/'+chatId, PUT, { authToken, message });

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}