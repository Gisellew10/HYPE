import React from "react";
import { Wrapper, FlexRow, FlexColumn, ImageWrapper } from "./style";
import Login from "../../components/Login-SignUp/Login";
import HomeNav from '../../components/Home/HomeNav';

function StartUpLogin() {
	return (
		<React.Fragment>
			<HomeNav/>
			<Wrapper>
				<FlexRow>
					<Login isStudent={false} />
					<ImageWrapper>
						<embed src="/images/loginBanner.svg" alt="" height={700} width={511} />
					</ImageWrapper>
				</FlexRow>
			</Wrapper>
		</React.Fragment>
	);
}

export default StartUpLogin;
