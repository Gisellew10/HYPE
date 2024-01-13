import React from "react";
import { Wrapper, MainHeader, MainButton } from "./style";
import { useHistory } from "react-router-dom";
import { useAuthTokenContextUpdate } from "../../contexts/authTokenContext";

function Logout() {
	const history = useHistory();
	const updateAuthToken = useAuthTokenContextUpdate();

	const logout = () => {
		console.log("Logout");
		updateAuthToken(""); // clears the cache token
		history.push("/");
	};

	return (
		<Wrapper>
			<MainHeader>Confirm that you want to log out.</MainHeader>
			<MainButton onClick={logout}>Logout</MainButton>
		</Wrapper>
	);
}

export default Logout;
