import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CableContext } from '../context/cable';

function ShowBroadcast() {
    const cableContext = useContext(CableContext)

    const [challenges, setChallenges] = useState([])
    const [newChallenge, setNewChallenge] = useState(null)

    useEffect(() => {
        fetch('/challenges')
            .then(r => r.json())
            .then(setChallenges)
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
        <>
        <Link to="/create-account">create account</Link>
        <ul>
            {challenges.map(challenge => <li key={challenge.id}>{challenge.user_username}</li>)}
        </ul>
        </>
    )
}

export default ShowBroadcast