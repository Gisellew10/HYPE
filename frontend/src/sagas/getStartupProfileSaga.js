import { GET, startupProfileEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const getStartupProfileSaga = async (authToken, startupProfileUpdate, onSuccess, onFailure) => {
    const response = await fetchCall(startupProfileEndpoint, GET, { authToken });

    const data = await response.json();

    if (data.success) {
        startupProfileUpdate(data.startupProfile);
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
