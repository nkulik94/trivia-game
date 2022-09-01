import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import QuestionListItem from "./QuestionListItem";
import PageButtons from "./PageButtons";
import SearchBar from "./SearchBar";

function QuestionList({ isAdmin }) {
    const [questions, setQuestions] = useState([])
    const [searched, setSearched] = useState('')
    const [page, setPage] = useState({start: 0, end: 20})

    useEffect(() => {
        fetch('/questions')
            .then(r => {
                if (r.ok) {
                    r.json().then(setQuestions)
                }
            })
    }, [])

    const filteredList = questions.filter(question => question.question.toUpperCase().includes(searched.toUpperCase()))

    //console.log(questions)

    if (!isAdmin) return <div></div>

    return (
        <Container sx={{marginTop: '5rem', textAlign: 'center'}}>
            <SearchBar searched={searched} setSearched={setSearched} placeholder={"Question"} />
            <Grid container spacing={2} sx={{marginTop: '1rem'}}>
                {filteredList.slice(page.start, page.end).map(question => {
                    return (
                        <Grid item xs={6} key={question.id}>
                            <Paper>
                                <QuestionListItem question={question} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
            <PageButtons setPage={setPage} count={Math.ceil(filteredList.length / 20)} />
        </Container>
    )
}

export default QuestionList