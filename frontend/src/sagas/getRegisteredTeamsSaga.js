import { GET, registeredTeamsEndpoint } from "./endpoints"
import { fetchCall } from "./fetchCalls"


export const getRegisteredTeamsSaga = async (authToken, competitionId, registeredTeamsUpdate, onSuccess, onFailure) => {
    const response = await fetchCall(registeredTeamsEndpoint+'/'+competitionId, GET, { authToken });

    const data = await response.json();

    if (data.success) {
        registeredTeamsUpdate(data.registeredTeams);
        onSuccess(data);
    } else {
        onFailure(data);
    }
}
