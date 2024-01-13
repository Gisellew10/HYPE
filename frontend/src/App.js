//import logo from './logo.svg';
import './App.css';
import React from "react";
import { GlobalContextProvider } from './contexts/globalContextProvider';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { SagaContextProvider } from './sagas/sagaContext';

import Home from "./pages/HomePage";
import StartUpSignUp from './pages/StartUpSignUp';
import StudentSignUp from './pages/StudentSignUp';
import StartUpLogin from './pages/StartUpLogin';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import StartUpDashboard from './pages/StartUpDashboard';
import StudentProfile from './pages/StudentProfile';
import StartUpProfile from './pages/StartUpProfile';
import StudentList from './pages/StudentListPage';
import Logout from './pages/Logout';
import Chat from './pages/Chat';
import CompetitionCreate from './pages/CompetitionCreate';
import CompetitionList from './pages/CompetitionList';
import New from './pages/New';
import SignupCompetition from './pages/SignupCompetition';
import RegisteredStudentList from './pages/RegisteredStudentList';

function App() {
  return (
    <GlobalContextProvider>
      <SagaContextProvider> {/* This provider is here instead of in the global provider to guarantee access to other contexts */}
        <Router>
            <div className="App">
                <Switch>
                  <Route path="/" exact component={Home} homeNav={true}/>
                  <Route path="/startup-signup" exact component={StartUpSignUp}/>
                  <Route path="/student-signup" exact component={StudentSignUp}/>
                  <Route path="/startup-login" exact component={StartUpLogin}/>
                  <Route path="/student-login" exact component={StudentLogin}/>
                  <Route path="/student-dashboard" exact component={StudentDashboard}/>
                  <Route path="/startup-dashboard" exact component={StartUpDashboard}/>
                  <Route path="/student-profile" exact component={StudentProfile}/>
                  <Route path="/startup-profile" exact component={StartUpProfile}/>
                  <Route path="/student-list" exact component={StudentList}/>
                  <Route path="/competition" exact component={CompetitionCreate}/>
                  <Route path="/registered-student-list" exact component={RegisteredStudentList}/>
                  <Route path="/competition-signup" exact component={SignupCompetition}/>
                  <Route path="/logout" exact component={Logout}/> 
                  <Route path="/chat" exact component={Chat}/> 
                  <Route path="/new" exact component={New}/> 
                  <Route path="/competition-list" exact component={CompetitionList} />
                </Switch>
            </div>
        </Router>
      </SagaContextProvider>
    </GlobalContextProvider>
  );
}

export default App;