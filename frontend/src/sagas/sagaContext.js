import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthTokenContext, useAuthTokenContextUpdate } from "../contexts/authTokenContext";
import { useStudentProfileContextUpdate } from "../contexts/studentProfileContext";
import { useStartupProfileContextUpdate } from "../contexts/startupProfileContext";
import { useStudentListContextUpdate } from "../contexts/studentListContext";
import { useChatContextUpdate } from "../contexts/chatContext";
import { useCreateChatContextUpdate } from "../contexts/createChatContext";
import { useRegisteredTeamsContextUpdate } from "../contexts/registeredTeamsContext";
import { useRegisteredStudentListContextUpdate } from "../contexts/registeredStudentListContext";


import { loginStudentSaga } from "./loginStudentSaga";
import { loginStartupSaga } from "./loginStartupSaga";
import { signupStudentSaga } from "./signupStudentSaga";
import { signupStartupSaga } from "./signupStartupSaga";
import { getStudentProfileSaga } from "./getStudentProfileSaga";
import { getStartupProfileSaga } from "./getStartupProfileSaga";
import { getStudentListSaga } from "./getStudentListSaga";
import { createChatSaga } from "./createChatSaga";
import { updateMemberChatSaga } from "./updateMemberChatSaga";
import { updateChatMessageSaga } from "./updateChatMessageSaga";
import { getChatSaga } from "./getChatSaga";
import { getRegisteredTeamsSaga } from "./getRegisteredTeamsSaga";
import { getRegisteredStudentListSaga } from "./getRegisteredStudentListSaga";
import { signUpCompetitionSaga } from "./signUpCompetitionSaga";

import { createCompetitionSaga, getCompetitionSaga, getAllCompetitionSaga } from "./createCompetitionSaga";

import { deleteChat } from "./deleteChatSaga";
import { deleteMessage } from "./deleteMessageSaga";


const SagaContext = createContext();

export function useSagas() { // <---- import this hook to call endpoints
    return useContext(SagaContext);
}

export function SagaContextProvider({ children }) {

    const authTokenUpdate = useAuthTokenContextUpdate();
    const authToken = useAuthTokenContext();
    const studentProfileUpdate = useStudentProfileContextUpdate();
    const startupProfileUpdate = useStartupProfileContextUpdate();
    const studentListUpdate = useStudentListContextUpdate();
    const chatUpdate = useChatContextUpdate();
    const createChatUpdate = useCreateChatContextUpdate();
    const registeredTeamsUpdate = useRegisteredTeamsContextUpdate();
    const registeredStudentListUpdate = useRegisteredStudentListContextUpdate();
    // <---- add context hooks required by endpoints here

    const sagas = {
        loginStudent: (email, password, onSuccess = () => {}, onFailure = () => {}) => loginStudentSaga(authTokenUpdate, email, password, onSuccess, onFailure),
        loginStartup: (email, password, onSuccess = () => {}, onFailure = () => {}) => loginStartupSaga(authTokenUpdate, email, password, onSuccess, onFailure),
        signupStudent: (email, password, name, onSuccess = () => {}, onFailure = () => {}) => signupStudentSaga(email, password, name, onSuccess, onFailure),
        signupStartup: (email, password, companyName, onSuccess = () => {}, onFailure = () => {}) => signupStartupSaga(email, password, companyName, onSuccess, onFailure),
        createCompetitionSaga: (prizesRewards, location, format, timeline, eligibilityCriteria, teamSize, goals, purposeTheme, competitionTitle, onSuccess = () => {}, onFailure = () => {}) => createCompetitionSaga(prizesRewards, location, format, timeline, eligibilityCriteria, teamSize, goals, purposeTheme, competitionTitle, authToken, onSuccess, onFailure),
        createChatSaga: (chatname, othersUserId, onSuccess = () => {}, onFailure = () => {}) => createChatSaga(chatname, othersUserId, authToken, onSuccess, onFailure),
        createChat: (chatname, othersUserId, onSuccess = () => {}, onFailure = () => {}) => createChatSaga(chatname, othersUserId, authToken, createChatUpdate, onSuccess, onFailure),
        updateMembersChatSaga: (chatId, members, onSuccess = () => {}, onFailure = () => {}) => updateMemberChatSaga(chatId, members, authToken, onSuccess, onFailure),
        getStudentProfile: (onSuccess = () => {}, onFailure = () => {}) => getStudentProfileSaga(authToken, studentProfileUpdate, onSuccess, onFailure),
        getStartupProfile: (onSuccess = () => {}, onFailure = () => {}) => getStartupProfileSaga(authToken, startupProfileUpdate, onSuccess, onFailure),
        getStudentList: (onSuccess = () => {}, onFailure = () => {}) => getStudentListSaga(authToken, studentListUpdate, onSuccess, onFailure),
        getChats: (onSuccess = () => {}, onFailure = () => {}) => getChatSaga(authToken, chatUpdate, onSuccess, onFailure),
        getCompetition: (compID, onSuccess = () => {}, onFailure = () => {}) => getCompetitionSaga(compID, authToken, onSuccess, onFailure),
        getAllCompetition: (onSuccess = () => {}, onFailure = () => {}) => getAllCompetitionSaga(authToken, onSuccess, onFailure),
        updateChatMessageSaga: (chatId, message, onSuccess = () => {}, onFailure = () => {}) => updateChatMessageSaga(chatId, message, authToken, onSuccess, onFailure),
        deleteChat: (chatId, onSuccess = () => {}, onFailure = () => {}) => deleteChat(chatId, authToken, onSuccess, onFailure),
        deleteMessage: (chatId, clickedMessageIndex, onSuccess = () => {}, onFailure = () => {}) => deleteMessage(chatId, clickedMessageIndex, authToken, onSuccess, onFailure),
        getRegisteredTeams: (competitionId, onSuccess = () => {}, onFailure = () => {}) => getRegisteredTeamsSaga(authToken, competitionId, registeredTeamsUpdate, onSuccess, onFailure),
        getRegisteredStudentList: (userId, onSuccess = () => {}, onFailure = () => {}) => getRegisteredStudentListSaga(authToken, userId, registeredStudentListUpdate, onSuccess, onFailure),
        signUpCompetitionSaga: (competitionId, teamName, othersUserId, onSuccess = () => {}, onFailure = () => {}) => signUpCompetitionSaga(competitionId, teamName, othersUserId, authToken, onSuccess, onFailure),
        // <---- add endpoints here
    };
    
    const [sagaContext, setSagas] = useState(sagas);
    useEffect(() => {
        setSagas(sagas);
    }, [authToken]); // <---- add non-update contexts required by endpoints here

    return (
        <SagaContext.Provider value={sagaContext}>
            {children}
        </SagaContext.Provider>
    );
}

