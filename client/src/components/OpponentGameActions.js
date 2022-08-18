import React, { useContext } from "react";
import { GameContext } from "../context/game";
import CardActions from '@mui/material/CardActions';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import IconButton from '@mui/material/IconButton';

function OpponentGameActions({ id }) {
    const gameContext = useContext(GameContext)
    
    return (
        <CardActions>
            <IconButton disabled>
                {gameContext.game.buzzed_by_id === id ? <RadioButtonCheckedIcon sx={{color: 'red'}} /> : <RadioButtonUncheckedIcon sx={{color: 'red'}} />}
            </IconButton>
        </CardActions>
    )
}

export default OpponentGameActions