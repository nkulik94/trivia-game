import React, { useState, useContext, useEffect } from "react";
import { UserContext } from '../context/user'
import { CableContext } from '../context/cable'
import { GameContext } from "../context/game";
import Container from '@mui/material/Container';
import ChallengeForm from "./ChallengeForm";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AwaitingAcceptance from "./AwaitingAcceptance";

function CreateChallenge({ button }) {
    const cableContext = useContext(CableContext)
    const userContext = useContext(UserContext)
    const gameContext = useContext(GameContext)

    const [channel, setChannel] = useState(null)
    const [showForm, setShowForm] = useState(true)

    useEffect(() => {
        return () => {
            if (channel) {
                channel.unsubscribe()
            }
        }
    }, [channel])

    function handleCancel() {
        channel.unsubscribe()
        setShowForm(true)
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
                    received: (data) => {
                        if (data.player_2_id) {
                            const config = {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({...stakes, player_2_id: data.player_2_id})
                            }

                            fetch('/games', config)
                                .then(r => {
                                    if (r.ok) {
                                        r.json().then(game => {
                                            gameContext.setGame(game)
                                            newChannel.send({gameId: game.id})
                                            setShowForm(true)
                                        })
                                    }
                                })
                        }
                    }
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
                {showForm ? <ChallengeForm button={button} handleChallenge={handleChallenge}/> : <AwaitingAcceptance handleCancel={handleCancel} />}
            </Paper>
        </Container>
    )
}

export default CreateChallenge