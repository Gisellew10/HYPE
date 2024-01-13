import { GET, registeredStudentListEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const getRegisteredStudentListSaga = async (authToken, userId, registeredStudentListUpdate, onSuccess, onFailure) => {
    const response = await fetchCall(registeredStudentListEndpoint, GET, { authToken, userId });

    const data = await response.json();

    if (data.success) {
        registeredStudentListUpdate(data.students);
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
