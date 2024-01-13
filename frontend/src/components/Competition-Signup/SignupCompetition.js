import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import {
  Wrapper,
  FlexColumn,
  MainHeader,
  InputLabel,
  Input,
  MainButton,
  ErrorLabel,
  Box,
  FlexRow
} from "./style";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useSagas } from "../../sagas/sagaContext";
import { useAuthTokenContext } from "../../contexts/authTokenContext";

function SignupComp({members}) {

  const location = useLocation();
  const competitionId = location.state?.competitionId;
  const [teamName, setTeamName] = useState("");
  const [teamNameError, setTeamNameError] = useState(false);

  const [options, setOptions] = useState();
  const [selected, setSelected] = useState();


  const history = useHistory();

  const sagas = useSagas();
  const loggedIn = useAuthTokenContext();
  const animatedComponents = makeAnimated();

	useEffect(() => {
		if (!loggedIn) {
        history.push("/student-login");
		}
	}, [loggedIn]);

  const handleSignUp = (othersUserId) => {
    setTeamNameError(teamName === "");

    if (!(
        teamName === ""
    )) {
      signUp(othersUserId);
    }
  };
  const signUp = async (othersUserId) => {
    if (othersUserId.length === 0) {
        return;
    }
      sagas.signUpCompetitionSaga(competitionId, teamName, othersUserId, (data) => {
        console.log("success");
        history.push("/competition-list");
      }, (data) => {
        console.log("failure");
      });
  };

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
};

useEffect(()=>{
    sagas.getStudentList((data) => {
        setOptions(data.students.map((student)=>{
            return {
                value: student.name,
                label: student.name,
                userId: student.userId,
                image: '/images/user.png',
                color: 'red',
                disabled: members ? members.includes(student.userId) : false
            }
        })) 
    }, (data) => {
        console.log(data)
    })
}, [])

  return (
    <Wrapper>
      <FlexColumn>
        <MainHeader>Signup for a Competition</MainHeader>

          
        <InputLabel>Team Name</InputLabel>
        {teamNameError && (<ErrorLabel>Please input your team name</ErrorLabel>)}
        <Input
          type="text"
          placeholder="Enter your team name"
          value={teamName}
          onChange={(value) => setTeamName(value.target.value)}
        />

        <InputLabel>Add Team Member(s)</InputLabel>
          <div style={{ width: "100%", textAlign: "left" }}>
            <Select
              isMulti
              name="students"
              closeMenuOnSelect={false}
              options={options}
              components={animatedComponents}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
              isOptionDisabled={(option) => option.disabled}
              formatOptionLabel={(student) => (
                <FlexRow justifyContent="flex-start">
                  <Box>
                    <img src={student.image} />
                  </Box>
                  <div>{student.label}</div>
                </FlexRow>
              )}
            />
          </div>

        <MainButton onClick={() =>handleSignUp(selected ? selected.map((student) => student.userId) : [])}>Signup for  Competition</MainButton>
      </FlexColumn>
    </Wrapper>
  );
}

export default SignupComp;
