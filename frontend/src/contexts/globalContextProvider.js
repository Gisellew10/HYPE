import React from "react";
import { AuthTokenContextProvider } from "./authTokenContext";
import { StudentProfileContextProvider } from "./studentProfileContext";
import { StartupProfileContextProvider } from "./startupProfileContext";
import { StudentListContextProvider } from "./studentListContext";
import { RegisteredStudentListContextProvider } from "./registeredStudentListContext";
import { RegisteredTeamsContextProvider } from "./registeredTeamsContext";
import { ChatContextProvider } from "./chatContext";
import { CreateChatContextProvider } from "./createChatContext";
// add more context providers here

export function GlobalContextProvider({ children }) {
	return (
		<AuthTokenContextProvider>
			<StudentProfileContextProvider>
				<StartupProfileContextProvider>
					<StudentListContextProvider>
						<RegisteredStudentListContextProvider>
							<RegisteredTeamsContextProvider>
						<CreateChatContextProvider>
            				<ChatContextProvider>
						  		{children}
            				</ChatContextProvider>
						</CreateChatContextProvider>
							</RegisteredTeamsContextProvider>
						</RegisteredStudentListContextProvider>
					</StudentListContextProvider>
				</StartupProfileContextProvider>
			</StudentProfileContextProvider>
		</AuthTokenContextProvider>
	);
}
