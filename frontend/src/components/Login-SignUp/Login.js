import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
	Wrapper,
	FlexColumn,
	MainHeader,
	InputLabel,
	Input,
	MainButton,
	ErrorLabel,
} from "./style";
import { useSagas } from "../../sagas/sagaContext";
import { useAuthTokenContext } from "../../contexts/authTokenContext";

function Login(props) {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [invalidCredentials, setInvalidCredentials] = useState(false);
	const history = useHistory();

	const sagas = useSagas();

	const loggedIn = useAuthTokenContext();
	useEffect(() => {
		if (loggedIn) {
			if (props.isStudent) {
				const NavInfo = { storeType: "student"};
				localStorage.setItem("NavType", JSON.stringify(NavInfo));
				history.push("/student-profile"); //change to where you want to go after login
			} else {
				const NavInfo = { storeType: "startup"};
				localStorage.setItem("NavType", JSON.stringify(NavInfo));
				history.push("/startup-profile"); //change to where you want to go after login
			}
		}
	}, [loggedIn]);

	const handleLogin = () => {
		setEmailError(email === "");
		setPasswordError(password === "");

		if (!(email === "" || password === "")) {
			if (props.isStudent) {
				sagas.loginStudent(
					email,
					password,
					(data) => {
						console.log("success");
						setInvalidCredentials(false);
					},
					(data) => {
						console.log("failure");
						if(data.message == "Invalid email / password")	{
							setInvalidCredentials(true);
						}
					}
				);
			} else {
				sagas.loginStartup(
					email,
					password,
					(data) => {
						console.log("success");
						setInvalidCredentials(false);
					},
					(data) => {
						console.log("failure");
						if(data.message == "Invalid email / password")	{
							setInvalidCredentials(true);
						}
					}
				);
			}
		}
	};

	return (
		<Wrapper>
			<FlexColumn>
				<MainHeader>Welcome Back</MainHeader>
				
				{invalidCredentials && (
					<ErrorLabel>Invalid email / password</ErrorLabel>
				)}

				<InputLabel>Email</InputLabel>
				{emailError && <ErrorLabel>Please input your email</ErrorLabel>}
				<Input
					type="email"
					placeholder="Enter your email address"
					value={email}
					onChange={(value) => setEmail(value.target.value)}
				/>

				<InputLabel>Password</InputLabel>
				{passwordError && (
					<ErrorLabel>Please input a password</ErrorLabel>
				)}
				<Input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(value) => setPassword(value.target.value)}
				/>

				<MainButton onClick={handleLogin}>Login</MainButton>
			</FlexColumn>
		</Wrapper>
	);
}

export default Login;
