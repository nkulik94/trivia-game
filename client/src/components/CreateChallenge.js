import React, { useState, useContext } from "react";
import { UserContext } from '../context/user'
import { CableContext } from '../context/cable'
import Container from '@mui/material/Container';
import ChallengeForm from "./ChallengeForm";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AwaitingAcceptance from "./AwaitingAcceptance";

function CreateChallenge() {
    const cableContext = useContext(CableContext)
    const userContext = useContext(UserContext)

    const [showForm, setShowForm] = useState(true)
    const [channel, setChannel] = useState(null)

    function handleCancel() {
        
    }

    function handleChallenge(stakes) {

        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stakes)
        }

        fetch('/challenges', config)
        .then(r => {
            if (r.ok) {
                const newChannel = cableContext.cable.subscriptions.create({
                    channel: 'StartChallengeChannel',
                    user_id: userContext.user.id
                },
                {
                    received: console.log
                }
                )
                setChannel(newChannel)

                setShowForm(false)
            }
        })
    }

    return (
        <Container maxWidth='xs'>
            <Paper>
                {showForm ? <ChallengeForm handleChallenge={handleChallenge}/> : <AwaitingAcceptance handleCancel={handleCancel} />}
            </Paper>
        </Container>
    )
}

export default CreateChallenge