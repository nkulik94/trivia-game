import React from 'react';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AnswerButton from './AnswerButton';

function Question({ question, channel }) {
    return (
        <CardContent sx={{textAlign: 'center'}}>
            <Typography variant='h6'>
                Category:
                <br/>
                {question.category}
            </Typography>
            <Grid container>
                <Grid item xs={12} sx={{marginBottom: '1rem'}}>
                    <Paper sx={{padding: '1rem'}}>
                        {question.question}
                    </Paper>
                </Grid>
                {question.all_answers.map(answer => {
                    return (
                        <Grid item xs={6} key={answer}>
                            <AnswerButton channel={channel} answer={answer}/>
                        </Grid>
                    )
                })}
            </Grid>
        </CardContent>
    )
}

export default Question