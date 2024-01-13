import { POST, loginStudentEndpoint } from "./endpoints";
import { fetchCall } from "./fetchCalls";

export const loginStudentSaga = async (
	authTokenUpdate,
	email,
	password,
	onSuccess,
	onFailure
) => {
	const response = await fetchCall(loginStudentEndpoint, POST, {
		email,
		password,
	});

	const data = await response.json();

	if (data.success) {
		authTokenUpdate(data.authToken);
		localStorage.setItem("authToken", data.authToken); // Cache the authToken
		onSuccess(data);
	} else {
		onFailure(data);
	}
};
