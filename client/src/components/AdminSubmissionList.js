import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SubmittedQuestion from "./SubmittedQuestion";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import PageButtons from "./PageButtons";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function AdminSubmissionList() {
    const [submissions, setSubmissions] = useState([])
    const [value, setValue] = useState('pending')
    const [searched, setSearched] = useState('')
    const [page, setPage] = useState({start: 0, end: 20})

    useEffect(() => {
        fetch(`/${value}-submissions`)
            .then(r => {
                if (r.ok) {
                    r.json().then(setSubmissions)
                }
            })
    }, [value])

    const filteredQuestions = submissions.filter(question => question.user.username.toUpperCase().includes(searched.toUpperCase()))

    const pageCount = Math.ceil(filteredQuestions.length / 20)

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
                                <SubmittedQuestion question={question} />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <PageButtons setPage={setPage} count={pageCount} />
        </Container>
    )
}

export default AdminSubmissionList