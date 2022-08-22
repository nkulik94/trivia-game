import React, { useState, useContext } from 'react';
import { GameContext } from '../context/game';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UserGameActions from './UserGameActions';
import OpponentGameActions from './OpponentGameActions';
import InGameForm from './InGameForm';

function Player({ player, winnings, channel, isUser, isTurn }) {
    const gameContext = useContext(GameContext)

    return (
        <Card sx={{textAlign: 'center'}}>
            <CardContent>
                <Avatar src={player.avatar_url} alt={player.name} sx={{maxWidth: 's', margin: 'auto'}}/>
                <Typography variant='h6'>{player.name}</Typography>
                <Typography variant='h6'>Current Winnings: {winnings}</Typography>
                {isUser ? <UserGameActions channel={channel} isTurn={isTurn} /> : <OpponentGameActions id={player.id} />}
            </CardContent>
        </Card>
    )
}

export default Player