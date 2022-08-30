import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { GameContext } from "../context/game";
import ChallengeHandler from "./ChallengeHandler";
import Grid from "@mui/material/Grid";
import Profile from "./Profile";
import Typography from "@mui/material/Typography";

function Dashboard() {
    const userContext = useContext(UserContext)
    const game = useContext(GameContext).game
    const history = useHistory()

    useEffect(() => {
        if (game) {
            history.push('/play')
        }
    }, [game])

    if (!userContext.user) return <div></div>

    return (
        <Grid container sx={{width: '80%', margin: 'auto'}} spacing={1}>
            <Grid item xs={12}>
                <Profile />
            </Grid>
            <Grid item xs={6}>
                <ChallengeHandler />
            </Grid>
        </Grid>
    )
}

export default Dashboard