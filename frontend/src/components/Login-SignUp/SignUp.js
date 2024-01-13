import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  FlexRow,
  FlexColumn,
  MainHeader,
  InputLabel,
  Input,
  MainButton,
  SubHeader,
  ErrorLabel,
} from "./style";
import { useSagas } from "../../sagas/sagaContext";

function SignUp({ isStudent }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState(false);

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const history = useHistory();

  const sagas = useSagas();

  const handleSignUp = () => {
    setNameError(name === "");
    setEmailError(email === "");
    setPasswordError(password === "");
    setRePasswordError(rePassword === "");
    setPasswordMatchError(rePassword !== password);

    // console.log("name", nameError);
    // console.log("email", emailError);
    // console.log("password", passwordError);
    // console.log("rePassword", rePasswordError);
    // console.log("passwordMatchError", passwordMatchError);

    if (!(
      name === "" ||
      email === "" ||
      password === "" ||
      rePassword === "" ||
      rePassword !== password
    )) {
      signUp();
    }
  };
  const signUp = async () => {
    if (isStudent) { 
      sagas.signupStudent(email, password, name, (data) => {
        console.log("success");
        history.push("/student-login"); //change to where you want to go after signup
      }, (data) => {
        console.log("failure");
      });
    } else {
      sagas.signupStartup(email, password, name, (data) => {
        console.log("success");
        history.push("/startup-login"); //change to where you want to go after signup
      }, (data) => {
        console.log("failure");
      });
    }
  };

  return (
    <Wrapper>
      <FlexColumn>
        {isStudent ? (
          <MainHeader>Create a student account</MainHeader>
        ) : (
          <MainHeader>Create a start-up account</MainHeader>
        )}
        <SubHeader>Sign up now and unlock your potential!</SubHeader>

        {isStudent ? (
          <>
            <InputLabel>Name</InputLabel>
            {nameError && (<ErrorLabel>Please input your name</ErrorLabel>)}
          </>
        ) : (
          <>
            <InputLabel>Company Name</InputLabel>
            {nameError && (<ErrorLabel>Please input your company name</ErrorLabel>)}
          </>
        )}
        <Input
          type="text"
          placeholder={
            isStudent ? "Enter your full name" : "Enter your company name"
          }
          value={name}
          onChange={(value) => setName(value.target.value)}
        />

        <InputLabel>Email</InputLabel>
        {emailError && (<ErrorLabel>Please input your email</ErrorLabel>)}
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(value) => setEmail(value.target.value)}
        />

        <InputLabel>Password</InputLabel>
        {passwordError && (<ErrorLabel>Please input a password</ErrorLabel>)}
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(value) => setPassword(value.target.value)}
        />

        <InputLabel>Confirm password</InputLabel>
        {passwordError && (<ErrorLabel>Please re-type password</ErrorLabel>)}
        <Input
          type="password"
          placeholder="Enter your password again"
          value={rePassword}
          onChange={(value) => setRePassword(value.target.value)}
        />
        {passwordMatchError && (<ErrorLabel>The passwords do not match</ErrorLabel>)}

        <MainButton onClick={handleSignUp}>Create Account</MainButton>
      </FlexColumn>
    </Wrapper>
  );
}

export default SignUp;
