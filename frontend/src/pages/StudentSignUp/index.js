import React from "react";
import {
  Wrapper,
  FlexRow,
  FlexColumn,
  ImageWrapper
} from "./style";
import SignUp from '../../components/Login-SignUp/SignUp'
import HomeNav from '../../components/Home/HomeNav';

function StudentSignUp() {

  return (
    <React.Fragment>
      <HomeNav/>
      <Wrapper>
        <FlexRow>
          <SignUp isStudent={true}/>
          <ImageWrapper>
            <embed src="/images/signupBanner.svg" alt="" height={700} width={511}/>
          </ImageWrapper>
        </FlexRow>
      </Wrapper>
    </React.Fragment>
  );
}

export default StudentSignUp;
