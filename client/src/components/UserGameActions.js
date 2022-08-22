import React, { useState, useContext } from "react";
import { GameContext } from "../context/game";
import { UserContext } from "../context/user";
import CardActions from '@mui/material/CardActions';
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
        <CardActions>
            <Button onClick={() => setOpen(true)} disabled={!gameContext.game.awaiting_form || !isTurn}>Choose Stakes And Difficulty</Button>
            <Dialog open={open}>
                <InGameForm id={gameContext.game.id} setOpen={setOpen} />
            </Dialog>
            <IconButton>
                {buzzer}
            </IconButton>
        </CardActions>
    )
}

export default UserGameActions