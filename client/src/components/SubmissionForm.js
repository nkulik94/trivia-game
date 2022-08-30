import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function SubmissionForm({ open, setOpen, submission, setQuestions, questions, id = null }) {
    const [formData, setFormData] = useState(submission)

    function handleForm(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleCancel() {
        setFormData(submission)
        setOpen(false)
    }

    function handleSave() {
        const method = id ? 'PATCH' : "POST"
        const url = id ? `/submissions/${id}` : '/submissions'
        const config = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch(url, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(question => {
                        method === 'POST' ? setQuestions([...questions, question]) : setQuestions(question)
                        setOpen(false)
                    })
                }
            })
    }
    
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Submit/Edit a Question</DialogTitle>
            <Box sx={{padding: '1rem'}}>
                <TextField
                    required
                    multiline
                    label='Question'
                    name='question'
                    value={formData.question}
                    onChange={handleForm}
                />
                <br/>
                <TextField
                    required
                    multiline
                    label='Answer'
                    name='answer'
                    value={formData.answer}
                    onChange={handleForm}
                />
            </Box>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SubmissionForm