import React from "react";
import Paper from "@mui/material/Paper";

function AnswerButton({ answer }) {
    
    return (
        <Paper component='button' sx={{width: '100%', height: '2rem'}}>
            {answer}
        </Paper>
    )
}

export default AnswerButton