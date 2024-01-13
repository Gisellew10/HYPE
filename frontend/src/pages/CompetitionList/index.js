import React from "react";
import {
  PageWrapper,
  Wrapper,
  Card,
  Banner,
  MainHeader,
  Desc,
  JoinButton,
  MainButton,
  FlexRow,
  FlexColumn,
  ViewMoreButton
} from "./style";
import Nav from "../../components/NavBar/Nav";
import { useSagas } from "../../sagas/sagaContext";
import { useEffect, useState } from "react";
import ViewCompetition from "../../components/ViewCompetition";
import { useHistory } from "react-router-dom";

function CompetitionList() {
  const [compData, setCompData] = useState();
  const [viewCompetition, setViewCompetition] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState("");

  const history = useHistory();

  const sagas = useSagas();

  let type = "";

  if (localStorage.getItem("NavType")) {
    type = JSON.parse(localStorage.getItem("NavType")).storeType;
  }

  const getcomp = () => {
    sagas.getAllCompetition(
      (data) => {
        setCompData(data);
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


  const handleJoinClick = (competitionId) => {
    if(compData[0].isOwner){
      history.push("/registered-student-list", { competitionId });
    }else{
      history.push("/competition-signup", { competitionId });
    }
  };

  const goToCreate = () => {
     history.push("/competition");
  };

  return (
      <>
        <Nav location = "Competitions"/>
        {type == "startup" && <MainButton onClick={goToCreate}>Create Competition</MainButton>}
        <PageWrapper>
          <Wrapper>
            {compData.map((comp, i)=>{
              return (
                <Card key={i}>
                  <FlexColumn>
                    <Banner>
                      <img src="images/startup_logo.png" width={50} height={50}/>
                      <MainHeader>{comp.competition.competitionTitle}</MainHeader>
                    </Banner>
                    <Desc>
                    {comp.competition.goals}
                    </Desc>
                  </FlexColumn>
                  <FlexRow justifyContent='flex-end' alignItems='flex-end'>
                    <ViewMoreButton onClick={()=>{setSelectedCompetition(comp.competition.competitiontId); setViewCompetition(true)}}>
                      More
                    </ViewMoreButton>
                    {
                      compData[0].isOwner ? (
                        <JoinButton onClick={() => handleJoinClick(comp.competition.competitiontId)}>Teams</JoinButton>
                      ) : (
                        <JoinButton onClick={() => handleJoinClick(comp.competition.competitiontId)}>Join</JoinButton>
                      )
                    }
                  </FlexRow>
                </Card>
              )
            })}

          </Wrapper>
        </PageWrapper>
        {viewCompetition && <ViewCompetition compId={selectedCompetition} onDismiss={() => setViewCompetition(false)} />}
      </>
  );
}

export default CompetitionList;
