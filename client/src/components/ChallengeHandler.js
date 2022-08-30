import React, { useState } from "react";
import ChallengeList from "./ChallengeList";
import CreateChallenge from "./CreateChallenge";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";

function ChallengeHandler() {
    const [initiate, setInit] = useState(false)

    const button = <Button onClick={() => setInit(!initiate)}>{initiate ? "Find a challenge" : "Start a challenge"}</Button>

    return (
        <Container sx={{textAlign: 'center', width: 'fit-content'}}>
            <Typography variant="h6">Challenge Center</Typography>
            {initiate ? <CreateChallenge button={button} /> : <ChallengeList button={button} />}
        </Container>
    )
}

export default ChallengeHandler