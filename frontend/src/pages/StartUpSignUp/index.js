import React from "react";
import {
  Wrapper,
  FlexRow,
  FlexColumn,
  ImageWrapper
} from "./style";
import SignUp from '../../components/Login-SignUp/SignUp'
import HomeNav from '../../components/Home/HomeNav';

function StartUpSignUp() {

  return (
    <React.Fragment>
      <HomeNav/>
      <Wrapper>
        <FlexRow>
          <SignUp isStudent={false}/>
          <ImageWrapper>
            <embed src="/images/signupBanner.svg" alt="" height={700} width={511}/>
          </ImageWrapper>
        </FlexRow>
      </Wrapper>
    </React.Fragment>
  );
}

export default StartUpSignUp;
