import { PUT, updateMembersChatEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const updateMemberChatSaga = async (chatId, members, authToken, onSuccess, onFailure) => {
    const response = await fetchCall(updateMembersChatEndpoint+'/'+chatId, PUT, { members, authToken });

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
