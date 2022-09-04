import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function EditQuestion({ handleForm, formData, callbackObj, handleCancel }) {

    function handleSubmit(e) {
        e.preventDefault()
        callbackObj.id ? callbackObj.callback('edit', formData) : callbackObj.callback(formData)
    }

    return (
        <Box component='form' sx={{padding: '1rem'}} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    sx={{width: '100%'}}
                    multiline
                    rows={2}
                    label='Question'
                    name='question'
                    type='text'
                    value={formData.question}
                    onChange={handleForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    sx={{width: '100%'}}
                    label="Category"
                    name='category'
                    type='text'
                    value={formData.category}
                    onChange={handleForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    sx={{width: '100%'}}
                    label="Correct Answer"
                    name='correct_answer'
                    type='text'
                    value={formData.correct_answer}
                    onChange={handleForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    sx={{width: '100%'}}
                    label="Difficulty"
                    name='difficulty'
                    type='text'
                    value={formData.difficulty}
                    onChange={handleForm}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    label="Incorrect 1"
                    name='incorrect_1'
                    type='text'
                    value={formData.incorrect_1}
                    onChange={handleForm}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    label="Incorrect 2"
                    name="incorrect_2"
                    type='text'
                    value={formData.incorrect_2}
                    onChange={handleForm}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    label='Incorrect 3'
                    name='incorrect_3'
                    type='text'
                    value={formData.incorrect_3}
                    onChange={handleForm}
                    />
                </Grid>
            </Grid>
            <DialogActions>
                <Button type='submit'>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
                {callbackObj.id ? <Button color='error' onClick={() => callbackObj.callback('delete')}>Delete Question</Button> : null}
            </DialogActions>
        </Box>
    )
}

export default EditQuestion