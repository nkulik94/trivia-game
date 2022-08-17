import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from "./Dashboard";
import Home from "./Home";

function App() {
  const setUser = useContext(UserContext).setUser
  
  useEffect(() => {
    fetch('/me')
        .then(r => {
            if (r.ok) {
                r.json().then(setUser)
            }
        })
  }, [])

  return (
    <>
    <CssBaseline />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/create-account">
        <SignUp />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
    </Switch>
    </>
  );
}

export default App;