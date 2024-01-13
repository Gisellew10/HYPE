import React from "react";
import {
  Wrapper,
  FlexRow,
  FlexColumn,
  ImageWrapper
} from "./style";
import CreateComp from '../../components/Create-Competition/CreateCompetition'
import Nav from "../../components/NavBar/Nav";

function CompetitionCreate() {

  return (
    <React.Fragment>
      <Nav location = "Competitions"/>
      <Wrapper>
        <FlexRow>
          <CreateComp/>
        </FlexRow>
      </Wrapper>
    </React.Fragment>
  );
}

export default CompetitionCreate;