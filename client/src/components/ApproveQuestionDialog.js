import React from "react";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ApproveQuestionDialog({ setOpen }) {
    return (
        <>
        <Box sx={{padding: '2rem'}}>
            <Typography variant="h6">Approve this question?</Typography>
        </Box>
        <DialogActions>
            <Button>Approve</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
        </>
    )
}

export default ApproveQuestionDialog