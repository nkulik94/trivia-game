import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { GameContext } from "../context/game";
import ChallengeHandler from "./ChallengeHandler";

function Dashboard() {
    const userContext = useContext(UserContext)
    const game = useContext(GameContext).game
    const history = useHistory()

    useEffect(() => {
        if (game) {
            history.push('/play')
        }
    }, [game])

    if (!userContext.user) return <div></div>

    return (
        <ChallengeHandler />
    )
}

export default Dashboard