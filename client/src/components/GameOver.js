import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GameContext } from '../context/game';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function GameOver() {
    const gameContext = useContext(GameContext)
    const history = useHistory()

    function redirect() {
        fetch('/current-game', {method: 'DELETE'})
            .then(r => {
                if (r.ok) {
                    gameContext.setGame(null)
                    history.push('/dashboard')
                }
            })
    }

    return (
        <Backdrop open={gameContext.game.over}>
            <Card sx={{width: '50%'}}>
                <CardHeader title="Game Over!"/>
                <CardContent>
                    <Typography variant='h6'>{gameContext.game.message}</Typography>
                    <br/>
                    <br/>
                    <Link href="#" onClick={redirect}>Return to dashboard</Link>
                </CardContent>
            </Card>
        </Backdrop>
    )
}

export default GameOver