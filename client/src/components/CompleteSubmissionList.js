import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import SubmittedQuestion from "./SubmittedQuestion";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";

function CompleteSubmissionList() {
    const [questions, setQuestions] = useState([])
    const [searched, setSearched] = useState('')

    const filteredQuestions = questions.filter(question => question.user.username.toUpperCase().includes(searched.toUpperCase()))

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

    function editList(question) {
        setQuestions(questions.map(q => q.id === question.id ? question : q))
    }

    //console.log(questions)

    return (
        <Container sx={{textAlign: 'center'}}>
            <Typography variant='h2'>All Submissions</Typography>
            <Link component={RouterLink} to='/dashboard' sx={{width: 'fit-content', margin: 'auto'}}>Return to dashboard</Link>
            <Typography sx={{marginLeft: '15%', marginRight: '15%'}} variant='h5'>These have not yet been approved. Any question with 50 or more upvotes will gain automatic approval (pending confirmation of accuracy), even if it has already been rejected!</Typography>
            <SearchBar searched={searched} setSearched={setSearched} placeholder={'Username'}/>
            <Grid container spacing={2} sx={{marginTop: '1rem'}}>
                {filteredQuestions.map(question => {
                    return (
                        <Grid item key={question.id} xs={6}>
                            <Card>
                                <SubmittedQuestion question={question} callback={callback} editList={editList} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default CompleteSubmissionList