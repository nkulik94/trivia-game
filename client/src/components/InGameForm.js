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

function InGameForm({ id }) {
    const [formData, setFormData] = useState({stakes: ''})

    function handleRadioButtons(e) {
        setFormData({...formData, difficulty: e.target.value})
    }

    function handleSubmit() {
        
    }

    return (
        <Box component='form'>
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
                value={formData.stakes}
                onChange={e => setFormData({...formData, stakes: e.target.value})}
                />
                <br/>
                <br/>
                <Button type='submit' variant='contained'>Start Round</Button>
            </FormControl>
        </Box>
    )
}

export default InGameForm