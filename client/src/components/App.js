import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from "./Dashboard";
import Home from "./Home";
import Game from "./Game";
import CompleteSubmissionList from "./CompleteSubmissionList";
import AdminAppBar from "./AdminAppBar";
import QuestionList from "./QuestionList";
import AdminSubmissionList from "./AdminSubmissionList";

function App() {
  const userContext = useContext(UserContext)
  
  useEffect(() => {
    fetch('/me')
        .then(r => {
            if (r.ok) {
                r.json().then(userContext.setUser)
            }
        })
  }, [])

  return (
    <>
    <CssBaseline />
    {userContext.user && userContext.user.is_admin ? <AdminAppBar /> : null}
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path='/all-submissions'>
        <CompleteSubmissionList />
      </Route>
      <Route path="/create-account">
        <SignUp />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/play">
        <Game />
      </Route>
      <Route path="/question-list">
        <QuestionList isAdmin={userContext.user && userContext.user.is_admin} />
      </Route>
      <Route path='/admin-submissions-list'>
        <AdminSubmissionList />
      </Route>
    </Switch>
    </>
  );
}

export default App;