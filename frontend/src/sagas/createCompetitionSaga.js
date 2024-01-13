import { POST, GET, createCompetitionEndpoint, getCompetitionEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const createCompetitionSaga = async (prizesRewards, location, format, timeline, eligibilityCriteria, teamSize, goals, purposeTheme, competitionTitle, authToken, onSuccess, onFailure) => {
    const response = await fetchCall(createCompetitionEndpoint, POST, { prizesRewards, location, format, timeline, eligibilityCriteria, teamSize, goals, purposeTheme, competitionTitle, authToken });

    const data = await response.json();

    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}

export const getCompetitionSaga = async (compID, authToken, onSuccess, onFailure) => {
    const response = await fetchCall(getCompetitionEndpoint + '/' + compID, GET, { authToken });
    const data = await response.json();
    if (data.success) {
        onSuccess(data);
    } else {
        onFailure(data);
    }
}

export const getAllCompetitionSaga = async (authToken, onSuccess, onFailure) => {
    const response = await fetchCall(getCompetitionEndpoint, GET, { authToken });
    const data = await response.json();
    if (data.success) {
        onSuccess(data.data);
    } else {
        onFailure(data.data);
    }
}
