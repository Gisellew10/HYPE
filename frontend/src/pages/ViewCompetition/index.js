import React from "react";
import {
  PageWrapper,
  Wrapper,
  MainHeader,
  Banner,
  Box,
  BoxHeader,
  MainBody,
  FlexRow,
} from "./style";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useSagas } from "../../sagas/sagaContext";
import { useEffect, useState } from "react";

function ViewCompetition({ compId }) {
  const [compData, setCompData] = useState();

  const sagas = useSagas();

  const getcomp = () => {
    sagas.getCompetition(
      compId,
      (data) => {
        setCompData(data);
        // console.log(compData);
      },
      (data) => {
        console.log(data);
      }
    );
  };

  useEffect(() => {
    getcomp();
  }, []);

  if (!compData) {
    return;
  }

  return (
    <PageWrapper>
      <Wrapper>
        <Banner>
          <MainHeader>{compData.competition.competitionTitle}</MainHeader>
          {compData.competition.goals}
        </Banner>
        <MainBody>
          <Box>
            Purpose and Theme: {compData.competition.purposeTheme} <br />
            Location: {compData.competition.purposeTheme} <br />
            Team Size: {compData.competition.teamSize}
            <br />
            Eligibility Criteria: {compData.competition.eligibilityCriteria}
            <br />
          </Box>
          <BoxHeader onClick={() => getcomp()}>
            Deadlines and Timelines:
          </BoxHeader>
          <Box>{compData.competition.timeline}</Box>

          <BoxHeader>Format:</BoxHeader>
          <Box>{compData.competition.format}</Box>

          <BoxHeader>Prizes and Rewards:</BoxHeader>
          <Box>{compData.competition.prizesRewards}</Box>

          <FlexRow justifyContent="flex-end" style={{ margin: "0 0 10px 0" }}>
            {compData.isOwner && <EditIcon style={{ cursor: "pointer" }} />}
            <CloseIcon style={{ cursor: "pointer" }} />
          </FlexRow>
        </MainBody>
      </Wrapper>
    </PageWrapper>
  );
}

export default ViewCompetition;
