import { GET, studentProfileEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const getStudentProfileSaga = async (authToken, studentProfileUpdate, onSuccess, onFailure) => {
    const response = await fetchCall(studentProfileEndpoint, GET, { authToken });

    const data = await response.json();

    if (data.success) {
        studentProfileUpdate(data.studentProfile);
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
