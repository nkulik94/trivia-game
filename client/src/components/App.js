import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import SignIn from "./SignIn";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <>
    <CssBaseline />
    <SignIn />
    </>
  );
}

export default App;