import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { GameContext } from '../context/game';
import { UserContext } from '../context/user';
import { CableContext } from '../context/cable';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Player from "./Player";
import GameBoard from "./GameBoard";
import ErrorMsg from "./ErrorMsg";


function Game() {
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)
    const cableContext = useContext(CableContext)
    const history = useHistory()

    const [channel, setChannel] = useState(null)
    const [timerChannel, setTimerChannel] = useState(null)
    const [timer, setTimer] = useState('')

    function subscribeToChannels(id, isNew) {
        if (!timerChannel) {
            const newTimerChannel = cableContext.cable.subscriptions.create({
                channel: 'TimerChannel',
                game_id: id
            },
            {
                received: ({ timer_count }) => setTimer(timer_count)
            })
            if (isNew) {
                newTimerChannel.send({id: userContext.user.id})
            }
            setTimerChannel(newTimerChannel)
        }
        const gameChannel = cableContext.cable.subscriptions.create({
            channel: "GameChannel",
            game_id: id
        },
        {
           received: ({ game }) => gameContext.setGame(game)
        })
        setChannel(gameChannel)
    }

    useEffect(() => {
        if (gameContext.game) {
            subscribeToChannels(gameContext.game.id, true)
        } else {
            fetch('/current-game')
            .then(r => {
                if (r.ok) {
                    r.json().then(game => {
                        gameContext.setGame(game)
                        subscribeToChannels(game.id, false)
                    })
                } else {
                    history.push('/dashboard')
                }
            })
        }
    }, [])

    if (!gameContext.game) return <div></div>
    if (!userContext.user) return <div></div>

    //console.log(gameContext.game.current_question)

    return (
        <Container sx={{width: '80%', height: 'fit-content', margin: 'auto', textAlign: 'center'}}>
            <Paper>
                <Typography variant="h2">{`${gameContext.game.player_1.name} vs ${gameContext.game.player_2.name}`}</Typography>
                <Typography variant="h3">Pool: {gameContext.game.pool}</Typography>
                <Typography variant="h4">{gameContext.game.message}</Typography>
                <Typography variant="h4">{timer}</Typography>
                <Grid container >
                    <Grid item xs={3}>
                        <Player
                            player={gameContext.game.player_1}
                            winnings={gameContext.game.player_1_winnings}
                            channel={channel}
                            isUser={gameContext.game.player_1.id === userContext.user.id}
                            isTurn={gameContext.game.player_1_turn}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GameBoard question={gameContext.game.current_question} />
                    </Grid>
                    <Grid item xs={3}>
                        <Player
                            player={gameContext.game.player_2}
                            winnings={gameContext.game.player_2_winnings}
                            channel={channel}
                            isUser={gameContext.game.player_2.id === userContext.user.id}
                            isTurn={!gameContext.game.player_1_turn}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Game