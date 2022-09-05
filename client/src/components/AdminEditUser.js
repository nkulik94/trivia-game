import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

function AdminUserEdit({ field, value, onSubmit, onCancel }) {
    const [form, setForm] = useState({[field]: value})

    useEffect(() => {
        setForm({[field]: value})
    }, [field, value])

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{padding: '1rem'}}>
            <TextField
            type="text"
            label={field}
            value={form[field] || 0}
            onChange={e => setForm({[field]: e.target.value})}
            />
            <DialogActions>
                <Button type='submit'>Save</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </Box>
    )
}

export default AdminUserEdit