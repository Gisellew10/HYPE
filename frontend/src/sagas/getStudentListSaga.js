import { GET, studentListEndpoint } from "./endpoints";
import { fetchCall } from "./fetchCalls";

export const getStudentListSaga = async (
	authToken,
	studentListUpdate,
	onSuccess,
	onFailure
) => {
	const response = await fetchCall(studentListEndpoint, GET, { authToken });

	const data = await response.json();

	if (data.success) {
		studentListUpdate(data.students);
		onSuccess(data);
	} else {
		onFailure(data);
	}
};
