import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { Link as RouterLink } from 'react-router-dom'
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link'
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Demos from "./Demos";

function Home() {
    const user = useContext(UserContext).user

    const loginBtns = (
        <ButtonGroup>
            <Button component={RouterLink} to='/sign-in'>log in</Button>
            <Button component={RouterLink} to='/create-account'>create account</Button>
        </ButtonGroup>
    )

    return (
        <Container sx={{textAlign: 'center', marginTop: '2rem'}}>
            <Paper sx={{padding: '2rem'}}>
                <Typography variant="h2">Backward Jeopardy</Typography>
                <Typography variant="h5">Where we ask the questions and you find the answers</Typography>
                <br/>
                <br/>
                <Typography variant="body">Welcome to Backward Jeopardy! Here you can compete with other users for "points", which are kind of meant to represent real money. Please be sure to <Link component={RouterLink} to='/help'>read the rules</Link> before competing. Questions obtained via the Open Trivia DB API</Typography>
                <br/>
                <br/>
                {user ? <Link component={RouterLink} to='/dashboard'>Dashboard</Link> : loginBtns}
            </Paper>
            <Demos />
        </Container>
    )
}

export default Home