import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { GameContext } from '../context/game';
import { UserContext } from '../context/user';
import { CableContext } from '../context/cable';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


function Game() {
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)
    const cableContext = useContext(CableContext)
    const history = useHistory()

    const [channel, setChannel] = useState(null)

    function subscribeToGameChannel(id) {
        const gameChannel = cableContext.cable.subscriptions.create({
            channel: "GameChannel",
            game_id: id
        },
        {
           received: console.log
        })

        setChannel(gameChannel)
    }

    useEffect(() => {
        if (gameContext.game) {
            subscribeToGameChannel(gameContext.game.id)
        } else {
            fetch('/current-game')
            .then(r => {
                if (r.ok) {
                    r.json().then(game => {
                        gameContext.setGame(game)
                        subscribeToGameChannel(game.id)
                    })
                } else {
                    history.goBack()
                }
            })
        }
    }, [])

    //console.log(gameContext.game)

    if (!gameContext.game) return <div></div>

    return (
        <Container sx={{width: '80%', height: 'fit-content', margin: 'auto', textAlign: 'center'}}>
            <Paper>
                <Typography variant="h2">{`${gameContext.game.player_1.name} vs ${gameContext.game.player_2.name}`}</Typography>
            </Paper>
        </Container>
    )
}

export default Game