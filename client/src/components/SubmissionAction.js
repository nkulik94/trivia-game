import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SubmissionForm from "./SubmissionForm";

function SubmissionAction({ isUser, submission, setQuestion, id }) {
    const [open, setOpen] = useState(false)

    const upvote = (
        <IconButton>
            <ThumbUpOffAltIcon />
        </IconButton>
    )

    const edit = <Button onClick={() => setOpen(true)}>Edit</Button>

    return (
        <>
            {isUser ? edit : upvote}
            <SubmissionForm
                submission={submission}
                setQuestions={setQuestion}
                id={id}
                open={open}
                setOpen={setOpen}
                />
        </>
    )
}

export default SubmissionAction