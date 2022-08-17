import React, { useContext, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Challenge from './Challenge';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CableContext } from '../context/cable';

function ChallengeList() {
    const cableContext = useContext(CableContext)

    const [challenges, setChallenges] = useState([])
    const [newChallenge, setNewChallenge] = useState(null)

    useEffect(() => {
        fetch('/challenges')
            .then(r => {
                if (r.ok) {
                    r.json().then(setChallenges)
                }
            })
        const channel = cableContext.cable.subscriptions.create({
            channel: 'ChallengeChannel'
        },
        {
            received: ({ challenge }) => setNewChallenge(challenge)
        })

        return () => channel.unsubscribe()
    }, [])

    if (newChallenge) {
        newChallenge.deleted ? setChallenges(challenges.filter(challenge => challenge.id !== newChallenge.id)) : setChallenges([...challenges, newChallenge])
        setNewChallenge(null)
    }

    return (
        <Container maxWidth='xs'>
            <Paper sx={{textAlign: 'center', overflow: 'auto'}}>
                <Typography variant='h4'>Available Challenges</Typography>
                <List sx={{maxHeight: 300}}>
                    {challenges.map(challenge => <Challenge key={challenge.id} challenge={challenge} />)}
                </List>
            </Paper>
        </Container>
    )
}

export default ChallengeList