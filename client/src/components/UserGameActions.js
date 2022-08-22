import React, { useState, useContext } from "react";
import { GameContext } from "../context/game";
import { UserContext } from "../context/user";
import CardActions from '@mui/material/CardActions';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function UserGameActions({ channel }) {
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)

    const buzzer = gameContext.game.buzzed_by_id === userContext.user.id ? <RadioButtonCheckedIcon sx={{color: 'red'}} /> : <RadioButtonUncheckedIcon sx={{color: 'red'}} />



    return (
        <CardActions>
            <IconButton onClick={() => channel.send({kill: true})}>
                {buzzer}
            </IconButton>
        </CardActions>
    )
}

export default UserGameActions