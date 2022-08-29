import React, { useState, useContext } from "react";
import { GameContext } from "../context/game";
import { UserContext } from "../context/user";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import InGameForm from "./InGameForm";

function UserGameActions({ channel, isTurn }) {
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)

    const [open, setOpen] = useState(false)

    const buzzer = gameContext.game.buzzed_by_id === userContext.user.id ? <RadioButtonCheckedIcon sx={{color: 'red'}} /> : <RadioButtonUncheckedIcon sx={{color: 'red'}} />

    if (!isTurn && open) {
        setOpen(false)
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} disabled={!gameContext.game.awaiting_form || !isTurn}>Choose Stakes And Difficulty</Button>
            <br/>
            <IconButton onClick={() => channel.send({buzzed_by: userContext.user.id})} disabled={!gameContext.game.current_question || !!gameContext.game.buzzed_by_id}>
                {buzzer}
            </IconButton>
            <Dialog open={open}>
                <InGameForm id={gameContext.game.id} setOpen={setOpen} />
            </Dialog>
        </>
    )
}

export default UserGameActions