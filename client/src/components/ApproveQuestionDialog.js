import React from "react";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ApproveQuestionDialog({ setOpen, handleReview }) {
    return (
        <>
        <Box sx={{padding: '2rem'}}>
            <Typography variant="h6">Approve this question?</Typography>
        </Box>
        <DialogActions>
            <Button onClick={() => handleReview({approved: true, reviewed: true})}>Approve</Button>
            <Button color='error' onClick={() => handleReview({approved: false, reviewed: true})}>Reject</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
        </>
    )
}

export default ApproveQuestionDialog