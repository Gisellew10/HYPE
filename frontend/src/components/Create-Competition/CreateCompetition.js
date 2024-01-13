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

function CreateComp() {
  const [competitionTitle, setCompetitionTitle] = useState("");
  const [competitionTitleError, setCompetitionTitleError] = useState(false);

  const [purposeTheme, setPurposeTheme] = useState("");
  const [purposeThemeError, setPurposeThemeError] = useState(false);

  const [goals, setGoals] = useState("");
  const [goalsError, setGoalsError] = useState(false);

  const [teamSize, setTeamSize] = useState("");
  const [teamSizeError, setTeamSizeError] = useState(false);

  const [eligibilityCriteria, setEligibilityCriteria] = useState("");
  const [eligibilityCriteriaError, setEligibilityCriteriaError] = useState(false);

  const [timeline, setTimeline] = useState("");
  const [timelineError, setTimelineError] = useState(false);

  const [format, setFormat] = useState("");
  const [formatError, setFormatError] = useState(false);

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState(false);

  const [prizesRewards, setPrizesRewards] = useState("");
  const [prizesRewardsError, setPrizesRewardsError] = useState(false);

  const history = useHistory();

  const sagas = useSagas();
  const loggedIn = useAuthTokenContext();
	useEffect(() => {
		if (!loggedIn) {
        history.push("/startup-login"); //if not logged in go to startup login
		}
	}, [loggedIn]);

  const handleSignUp = () => {
    setCompetitionTitleError(competitionTitle === "");
    setPurposeThemeError(purposeTheme === "");
    setGoalsError(goals === "");
    setTeamSizeError(teamSize === "");
    setEligibilityCriteriaError(eligibilityCriteria === "");
    setTimelineError(timeline === "");
    setFormatError(format === "");
    setLocationError(location === "");
    setPrizesRewardsError(prizesRewards === "");

    if (!(
      competitionTitle === "" ||
      purposeTheme === "" ||
      goals === "" || 
      teamSize === "" ||
      eligibilityCriteria === "" ||
      timeline === "" ||
      format === "" ||
      location === "" ||
      prizesRewards === ""
    )) {
      signUp();
    }
  };
  const signUp = async () => {
      sagas.createCompetitionSaga(prizesRewards, location, format, timeline, eligibilityCriteria, teamSize, goals, purposeTheme, competitionTitle, (data) => {
        console.log("success");
        history.push("/startup-profile"); //change to where you want to go after create
      }, (data) => {
        console.log("failure");
      });
  };

  return (
    <Wrapper>
      <FlexColumn>
        <MainHeader>Create a Competition</MainHeader>

          
        <InputLabel>Title</InputLabel>
        {competitionTitleError && (<ErrorLabel>Please input the competition title</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the title of the competition"
          value={competitionTitle}
          onChange={(value) => setCompetitionTitle(value.target.value)}
        />

        <InputLabel>Purpose and Theme</InputLabel>
        {purposeThemeError && (<ErrorLabel>Please input the purpose and theme</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the purpose and theme of the competition"
          value={purposeTheme} 
          onChange={(value) => setPurposeTheme(value.target.value)}
        />

        <InputLabel>Goals</InputLabel>
        {goalsError && (<ErrorLabel>Please input the goals</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the goals of the competition"
          value={goals} 
          onChange={(value) => setGoals(value.target.value)}
        />

        <InputLabel>Team Size</InputLabel>
        {teamSizeError && (<ErrorLabel>Please input the team size</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the team size of the competition"
          value={teamSize}
          onChange={(value) => setTeamSize(value.target.value)}
        />

        <InputLabel>Eligibility Criteria</InputLabel>
        {eligibilityCriteriaError && (<ErrorLabel>Please input the eligibility criteria</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the eligibility criteria of the competition"
          value={eligibilityCriteria}
          onChange={(value) => setEligibilityCriteria(value.target.value)}
        />

        <InputLabel>Competition Timeline</InputLabel>
        {timelineError && (<ErrorLabel>Please input the timeline</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the timeline of the competition"
          value={timeline}
          onChange={(value) => setTimeline(value.target.value)}
        />

        <InputLabel>Format</InputLabel>
        {formatError && (<ErrorLabel>Please input the format</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the format of the competition"
          value={format}
          onChange={(value) => setFormat(value.target.value)}
        />

        <InputLabel>Location</InputLabel>
        {locationError && (<ErrorLabel>Please input the location</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the location of the competition"
          value={location}
          onChange={(value) => setLocation(value.target.value)}
        />

        <InputLabel>Prizes and Rewards</InputLabel>
        {prizesRewardsError && (<ErrorLabel>Please input the prizes and rewards</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter the prizes and rewards of the competition"
          value={prizesRewards}
          onChange={(value) => setPrizesRewards(value.target.value)}
        />

        <MainButton onClick={handleSignUp}>Create Competition</MainButton>
      </FlexColumn>
    </Wrapper>
  );
}

export default CreateComp;
