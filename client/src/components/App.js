import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LogOutBtn from "./LogoutBtn";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const setUser = useContext(UserContext).setUser
  //const actionCableUrl = process.env.NODE_ENV === ('development' || 'test') ? 'wss://localhost:3000/cable' : 'wss://backward-jeopardy.herokuapp.com/cable'

  //console.log(actionCableUrl)
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
        <LogOutBtn />
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