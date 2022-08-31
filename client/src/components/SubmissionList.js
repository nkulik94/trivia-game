import React, { useState } from "react";
import SubmittedQuestion from "./SubmittedQuestion";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SubmissionForm from "./SubmissionForm";

function SubmissionList({ questions }) {
    const [open, setOpen] = useState(false)
    const [questionList, setQuestions] = useState(questions)

    function handleDelete(id) {
        fetch(`/submissions/${id}`, {method: 'Delete'})
        .then(r => {
            if (r.ok) {
                setQuestions(questionList.filter(question => question.id !== id))
            }
        })
    }

    function handleAdd(data) {
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch('/submissions', config)
            .then(r => {
                if (r.ok) {
                    r.json().then(question => setQuestions([...questionList, question]))
                }
            })
    }

    function handleEdit(id, data) {
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(`/submissions/${id}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(updatedQ => setQuestions(questionList.map(question => question.id === updatedQ.id ? updatedQ : question)))
                }
            })
    }

    function callback(dataObj) {
        if (dataObj.id) {
            dataObj.data ? handleEdit(dataObj.id, dataObj.data) : handleDelete(dataObj.id)
        } else {
            handleAdd(dataObj.data)
        }
    }

    const list = (
        <List sx={{maxHeight: 300}}>
            {questionList.map(question => <SubmittedQuestion key={question.id} question={question} callback={callback} />)}
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
           <SubmissionForm open={open} setOpen={setOpen} submission={{question: '', answer: ''}} callback={callback}/>
        </Box>
    )
}

export default SubmissionList