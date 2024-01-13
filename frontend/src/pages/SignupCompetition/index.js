import React from "react";
import {
  Wrapper,
  FlexRow,
  FlexColumn,
  ImageWrapper
} from "./style";
import SignupComp from '../../components/Competition-Signup/SignupCompetition'
import Nav from "../../components/NavBar/Nav";

function SignupCompetition() {

  return (
    <React.Fragment>
      <Nav location = "Competitions"/>
      <Wrapper>
        <FlexRow>
          <SignupComp/>
        </FlexRow>
      </Wrapper>
    </React.Fragment>
  );
}

export default SignupCompetition;