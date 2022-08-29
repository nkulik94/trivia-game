import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ErrorMsg from "./ErrorMsg";

function InGameForm({ id, setOpen }) {
    const [formData, setFormData] = useState({current_stakes: ''})
    const [errors, setErrors] = useState(null)

    function handleRadioButtons(e) {
        setFormData({...formData, difficulty: e.target.value})
    }

    function handleErrors(errors) {
        setErrors(errors)
        setTimeout(() => setErrors(null), 3000)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const config = {
            method: 'PATCH',
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        setOpen(false)
        fetch(`/games/${id}`, config)
            .then(r => {
                if (!r.ok) {
                    r.json().then(({ errors }) => {
                        setOpen(true)
                        handleErrors(errors)
                    })
                }
            })
    }

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{padding: '2rem'}}>
            <FormControl>
                <FormLabel>Select stakes and difficulty</FormLabel>
                <RadioGroup row>
                    <FormControlLabel
                    onChange={handleRadioButtons}
                    value="easy" control={<Radio />}
                    label="Easy"
                    />
                    <FormControlLabel
                    onChange={handleRadioButtons}
                    value="medium" control={<Radio />}
                    label="Medium"
                    />
                    <FormControlLabel
                    onChange={handleRadioButtons}
                    value="hard"
                    control={<Radio />}
                    label="Hard"
                    />
                </RadioGroup>
                <br/>
                <TextField
                required
                label='Set Stakes'
                name='stakes'
                type="number"
                value={formData.current_stakes}
                onChange={e => setFormData({...formData, current_stakes: parseInt(e.target.value, 10)})}
                />
                <br/>
                {errors ? errors.map(error => <ErrorMsg error={error} key={error} />) : null}
                <br/>
                <Button type='submit' variant='contained'>Start Round</Button>
            </FormControl>
        </Box>
    )
}

export default InGameForm