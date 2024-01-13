import { POST, signupStartupEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const signupStartupSaga = async (email, password, companyName, onSuccess, onFailure) => {
    const response = await fetchCall(signupStartupEndpoint, POST, { email, password, companyName });

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
