import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  return (
    <>
    <CssBaseline />
    <Switch>
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