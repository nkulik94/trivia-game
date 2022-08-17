import React, { useState } from "react";

const GameContext = React.createContext()

function GameProvider({ children }) {
    const [game, setGame] = useState(null)

    function getAndSetGame(id) {
        fetch(`/games/${id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(setGame)
                }
            })
    }

    const currentGame = {
        game,
        setGame,
        getAndSetGame
    }

    return <GameContext.Provider value={currentGame}>{children}</GameContext.Provider>
}

export { GameContext, GameProvider }