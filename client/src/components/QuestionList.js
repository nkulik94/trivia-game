import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import QuestionListItem from "./QuestionListItem";
import PageButtons from "./PageButtons";
import Dialog from "@mui/material/Dialog";
import SearchBar from "./SearchBar";
import EditQuestion from "./EditQuestion";

function QuestionList({ isAdmin }) {
    const [questions, setQuestions] = useState([])
    const [searched, setSearched] = useState('')
    const [page, setPage] = useState({start: 0, end: 20})
    const [open, setOpen] = useState(false)
    const [callbackObj, setCallback] = useState({callback: handleNewQuestion})
    const [formData, setForm] = useState({
        question: '',
        category: '',
        correct_answer: '',
        difficulty: '',
        incorrect_1: '',
        incorrect_2: '',
        incorrect_3: ''
    })

    useEffect(() => {
        fetch('/questions')
            .then(r => {
                if (r.ok) {
                    r.json().then(setQuestions)
                }
            })
    }, [])

    function handleEditBtn(id) {
        fetch(`/questions/${id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(({ question, correct_answer, category, difficulty, incorrect_answers }) => {
                        setOpen(true)
                        setForm({
                            question,
                            category,
                            difficulty,
                            correct_answer,
                            incorrect_1: incorrect_answers[0],
                            incorrect_2: incorrect_answers[1],
                            incorrect_3: incorrect_answers[2]
                        })
                        setCallback({id, callback: editDeleteCallback})
                    })
                }
            })
    }

    function handleForm(e) {
        setForm({...formData, [e.target.name]: e.target.value})
    }

    function handleReset() {
        setForm({
            question: '',
            category: '',
            correct_answer: '',
            difficulty: '',
            incorrect_1: '',
            incorrect_2: '',
            incorrect_3: ''
        })
        setOpen(false)
        setCallback({callback: handleNewQuestion})
    }

    function handleDelete(id) {
        fetch(`/questions/${id}`, {method: 'DELETE'})
            .then(r => {
                if (r.ok) {
                    setQuestions(questions.filter(q => q.id !== id))
                    handleReset()
                }
            })
    }

    function handleNewQuestion(body) {
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch('/questions', config)
            .then(r => {
                if (r.ok) {
                    r.json().then(question => {
                        setQuestions([question, ...questions])
                        handleReset()
                    })
                }
            })
    }

    function handleEdit(id, body) {
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch(`/questions/${id}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(question => {
                        setQuestions(questions.map(q => q.id === id ? question : q))
                        handleReset()
                    })
                }
            })
    }

    function editDeleteCallback(action, body) {
        action === 'delete' ? handleDelete(this.id) : handleEdit(this.id, body)
    }

    const filteredList = questions.filter(question => question.question.toUpperCase().includes(searched.toUpperCase()))

    //console.log(formData)

    if (!isAdmin) return <div></div>

    return (
        <Container sx={{marginTop: '5rem', textAlign: 'center'}}>
            <SearchBar searched={searched} setSearched={setSearched} placeholder={"Question"} />
            <Grid container spacing={2} sx={{marginTop: '1rem'}}>
                {filteredList.slice(page.start, page.end).map(question => {
                    return (
                        <Grid item xs={6} key={question.id}>
                            <Paper>
                                <QuestionListItem question={question} handleEdit={handleEditBtn} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
            <Dialog open={open} onClose={handleReset}>
                <EditQuestion
                formData={formData}
                handleForm={handleForm}
                handleCancel={handleReset}
                callbackObj={callbackObj}
                />
            </Dialog>
            <PageButtons setPage={setPage} count={Math.ceil(filteredList.length / 20)} />
        </Container>
    )
}

export default QuestionList