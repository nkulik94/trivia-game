import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ErrorMsg from './ErrorMsg';

function AdminAuth({ setVisible }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    function handleError(error) {
        setError(error)
        setTimeout(() => setError(null), 3000)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password})
        }

        fetch('/admin-login', config)
            .then(r => r.ok ? setVisible(false) : r.json().then(({ error }) => handleError(error)))
    }

    return (
        <Box component='form' onSubmit={handleSubmit}>
            <TextField
                type='password'
                label='Admin Key'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br/>
            {error ? <ErrorMsg error={error}/> : null}
            <Button type='submit'>Submit</Button>
        </Box>
    )
}

export default AdminAuth