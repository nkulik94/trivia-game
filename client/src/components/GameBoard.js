import React from 'react';
import Card from '@mui/material/Card';
import Question from './Question';

function GameBoard({ question }){
    return (
        <Card sx={{backgroundColor: 'black', height: '100%'}}>
            { question ? <Question question={question} /> : null }
        </Card>
    )
}

export default GameBoard