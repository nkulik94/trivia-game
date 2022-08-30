import React, { useState } from "react";
import SubmittedQuestion from "./SubmittedQuestion";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import SubmissionForm from "./SubmissionForm";

function SubmissionList({ questions }) {
    const [open, setOpen] = useState(false)
    const [questionList, setQuestions] = useState(questions)
    const list = (
        <List sx={{maxHeight: 300}}>
            {questionList.map(question => <SubmittedQuestion key={question.id} question={question}/>)}
        </List>
    )

    return (
        <Box sx={{textAlign: 'center'}}>
            <Typography variant='h6'>Submit questions to earn points!</Typography>
            <Paper sx={{overflow: 'auto'}}>
                <Button onClick={() => setOpen(true)}>Submit a question</Button>
                <Typography variant='h4'>My Submissions</Typography>
                {questionList.length == 0 ? <Typography variant="h6">No submitted questions yet!</Typography> : list}
            </Paper>
           <SubmissionForm open={open} setOpen={setOpen} submission={{question: '', answer: ''}} setQuestions={setQuestions} questions={questionList}/>
        </Box>
    )
}

export default SubmissionList