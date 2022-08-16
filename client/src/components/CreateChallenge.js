import React, { useState } from "react";
import Container from '@mui/material/Container';
import ChallengeForm from "./ChallengeForm";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AwaitingAcceptance from "./AwaitingAcceptance";

function CreateChallenge() {
    const [showForm, setShowForm] = useState(true)
    return (
        <Container maxWidth='xs'>
            <Paper>
                {showForm ? <ChallengeForm /> : <AwaitingAcceptance />}
            </Paper>
        </Container>
    )
}

export default CreateChallenge