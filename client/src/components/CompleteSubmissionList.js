import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SubmittedQuestion from "./SubmittedQuestion";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function CompleteSubmissionList() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch('/submissions')
            .then(r => r.json())
            .then(setQuestions)
    }, [])

    function handleDelete(id) {
        fetch(`/submissions/${id}`, {method: 'Delete'})
        .then(r => {
            if (r.ok) {
                setQuestions(questions.filter(question => question.id !== id))
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
                    r.json().then(question => setQuestions([...questions, question]))
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
                    r.json().then(updatedQ => setQuestions(questions.map(question => question.id === updatedQ.id ? updatedQ : question)))
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

    return (
        <Container sx={{textAlign: 'center'}}>
            <Typography variant='h2'>All Submissions</Typography>
            <Typography sx={{marginLeft: '15%', marginRight: '15%'}} variant='h5'>These have not yet been approved. Any question with 50 or more upvotes will gain automatic approval (pending confirmation of accuracy), even if it has already been rejected!</Typography>
            <Grid container spacing={2}>
                {questions.map(question => {
                    return (
                        <Grid item key={question.id} xs={6}>
                            <Card>
                                <SubmittedQuestion question={question} callback={callback} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default CompleteSubmissionList