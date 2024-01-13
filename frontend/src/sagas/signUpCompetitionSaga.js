import { PUT, signUpCompetitionEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const signUpCompetitionSaga = async (competitionId, teamName, othersUserId, authToken, onSuccess, onFailure) => {
    const response = await fetchCall(signUpCompetitionEndpoint+'/'+competitionId, PUT, { authToken, teamName, othersUserId });

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
