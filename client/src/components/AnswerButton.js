import React, { useContext } from "react";
import { GameContext } from "../context/game";
import { UserContext } from "../context/user";
import Paper from "@mui/material/Paper";

function AnswerButton({ answer, channel }) {
    let background = '#191970';
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)
    
    if (answer === gameContext.game.current_answer) {
        background = answer === gameContext.game.current_question.correct_answer  ? 'green' : 'red'
    }

    function handleClick() {
        channel.send({id: userContext.user.id, answer: answer})
    }

    return (
        <Paper component='button' onClick={handleClick} sx={{width: '100%', height: '2rem', backgroundColor: background}}>
            {answer}
        </Paper>
    )
}

export default AnswerButton