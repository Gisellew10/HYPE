import { POST, signupStudentEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const signupStudentSaga = async (email, password, name, onSuccess, onFailure) => {
    const response = await fetchCall(signupStudentEndpoint, POST, { email, password, name });

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
