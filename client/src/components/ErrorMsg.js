import React from "react";
import Typography from '@mui/material/Typography';

function ErrorMsg({ error }) {
    return (
        <>
        <Typography sx={{color: 'red'}} variant="body" >{error}</Typography>
        <br/>
        </>
    )
}

export default ErrorMsg