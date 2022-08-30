import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ChallengeForm({ handleChallenge, button }) {
    const [stakes, setStakes] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        handleChallenge({stakes: parseInt(stakes, 10)})
    }

    return (
        <Box sx={{textAlign: 'center', width: '100%'}}>
            {button}
            <Typography variant='h5' sx={{paddingTop: '2%'}}>Initiate a Challenge</Typography>
            <Box component='form' sx={{
                margin: 'auto',
                paddingTop: '20%',
                paddingBottom: '30%',
            }}
            onSubmit={handleSubmit}
            >
                <TextField
                required
                label='Choose Stakes'
                name='stakes'
                value={stakes}
                onChange={e => setStakes(e.target.value)}
                />
                <br/>
                <br/>
                <Button type='submit' variant='contained'>Start Challenge</Button>
            </Box>
        </Box>
    )
}

export default ChallengeForm