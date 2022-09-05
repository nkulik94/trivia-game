import React, { useEffect, useState, useContext } from "react";
import { QuestionsContext } from "../context/questions";
import Grid from "@mui/material/Grid";
import SubmittedQuestion from "./SubmittedQuestion";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";
import PageButtons from "./PageButtons";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EditQuestion from "./EditQuestion";
import Dialog from "@mui/material/Dialog";
import ApproveQuestionDialog from "./ApproveQuestionDialog";

function AdminSubmissionList() {
    const questionsContext = useContext(QuestionsContext)
    const [submissions, setSubmissions] = useState([])
    const [value, setValue] = useState('pending')
    const [searched, setSearched] = useState('')
    const [page, setPage] = useState({start: 0, end: 20})
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        question: '',
        category: '',
        correct_answer: '',
        difficulty: '',
        incorrect_1: '',
        incorrect_2: '',
        incorrect_3: ''
    })
    const [submissionId, setId] = useState(null)

    useEffect(() => {
        fetch(`/${value}-submissions`)
            .then(r => {
                if (r.ok) {
                    r.json().then(setSubmissions)
                }
            })
    }, [value])

    function handleDialog(question, answer, id) {
        setOpen(true)
        setId(id)
        if (value === 'approved') {
            setFormData({...formData, question, correct_answer: answer})
        }
    }

    const filteredQuestions = submissions.filter(question => question.user.username.toUpperCase().includes(searched.toUpperCase()))

    const pageCount = Math.ceil(filteredQuestions.length / 20)

    const handleCancel = () => setOpen(false)

    function handleNewQuestion(body) {
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch(`/approved-questions/${submissionId}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(q => questionsContext.setQuestions([...questionsContext.questions, q]))
                    setSubmissions(submissions.filter(submission => submission.id !== submissionId))
                    setOpen(false)
                }
            })
    }

    function handleReview(body) {
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch(`/submissions/${submissionId}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(submission => {
                        setSubmissions(submissions.filter(s => s.id !== submission.id))
                        setOpen(false)
                    })
                }
            })
    }

    return (
        <Container sx={{textAlign: 'center'}}>
            <SearchBar searched={searched} setSearched={setSearched} placeholder={'Username'}/>
            <Box>
                <Tabs value={value} onChange={(_, value) => setValue(value)}>
                    <Tab value='pending' label="pending" />
                    <Tab value='approved' label='approved'/>
                </Tabs>
            </Box>
            <Grid container spacing={2} sx={{marginTop: '1rem'}}>
                {filteredQuestions.slice(page.start, page.end).map(question => {
                    return (
                        <Grid item key={question.id} xs={6}>
                            <Card>
                                <SubmittedQuestion question={question} value={value === 'pending' ? 'review' : 'add'} handleAdminActions={handleDialog} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)}>
                {value === 'pending' ? <ApproveQuestionDialog setOpen={setOpen} handleReview={handleReview} /> : <EditQuestion setForm={setFormData} formData={formData} handleCancel={handleCancel} callbackObj={{callback: handleNewQuestion}} />}
            </Dialog>
            <PageButtons setPage={setPage} count={pageCount} />
        </Container>
    )
}

export default AdminSubmissionList