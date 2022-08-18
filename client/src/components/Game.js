import React, { useContext, useEffect, useState } from "react";
import { GameContext } from '../context/game';
import { UserContext } from '../context/user';
import { CableContext } from '../context/cable';

function Game() {
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)
    const cableContext = useContext(CableContext)

    const [channel, setChannel] = useState(null)

    useEffect(() => {
        const gameChannel = cableContext.cable.subscriptions.create({
            channel: "GameChannel",
            game_id: gameContext.game.id
        },
        {
           received: console.log 
        })

        setChannel(gameChannel)
    }, [])

    return <button onClick={() => channel.send({difficulty: 'easy'})}>test</button>
}

export default Game