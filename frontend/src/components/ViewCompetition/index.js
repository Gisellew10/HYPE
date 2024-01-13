import React from "react";
import {
  PageBg,
  Wrapper,
  MainHeader,
  Banner,
  Box,
  BoxHeader,
  MainBody,
  FlexRow,
  JoinButton
} from "./style";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useSagas } from "../../sagas/sagaContext";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ViewCompetition({ compId, onDismiss }) {
  const [compData, setCompData] = useState();

  const sagas = useSagas();
  const history = useHistory();

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

  const handleJoinClick = () => {
    if (compData && compData.competition) {
      const competitionId = compData.competition.competitiontId; 
      history.push("/competition-signup", { competitionId });
    }
  };
  

  return (
      <>
        <PageBg
          onClick={() => {
            onDismiss();
          }}
          />
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
              {!compData.isOwner && (              
                <JoinButton onClick={handleJoinClick}>Join</JoinButton>
              )}
              {compData.isOwner && <EditIcon style={{ cursor: "pointer" }} />}
              <CloseIcon style={{ cursor: "pointer" }} onClick={() => {onDismiss();}}/>
            </FlexRow>
          </MainBody>
        </Wrapper>
      </>
  );
}

export default ViewCompetition;
