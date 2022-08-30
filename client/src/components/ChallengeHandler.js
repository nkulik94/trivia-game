import React, { useState } from "react";
import ChallengeList from "./ChallengeList";
import CreateChallenge from "./CreateChallenge";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

function ChallengeHandler() {
    const [initiate, setInit] = useState(false)

    const button = <Button onClick={() => setInit(!initiate)}>{initiate ? "Find a challenge" : "Start a challenge"}</Button>

    return (
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="h6">Challenge Center</Typography>
            {initiate ? <CreateChallenge button={button} /> : <ChallengeList button={button} />}
        </Box>
    )
}

export default ChallengeHandler