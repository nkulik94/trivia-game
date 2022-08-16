import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function AwaitingAcceptance({ handleCancel }) {
    return (
        <Box sx={{
            width: '60%',
            margin: 'auto',
            paddingTop: '30%',
            paddingBottom: '30%',
            textAlign: 'center'
        }}
        >
            <Typography
            variant="h5"
            >
                Waiting for challenge to be accepted...
            </Typography>
            <br/>
            <Button color="error" variant="contained" onClick={handleCancel}>Cancel</Button>
        </Box>
    )
}

export default AwaitingAcceptance