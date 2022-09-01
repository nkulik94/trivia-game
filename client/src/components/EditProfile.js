import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ErrorMsg from "./ErrorMsg";

function EditProfile({ setOpen }) {
    const userContext = useContext(UserContext)
    const user = userContext.user
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                avatar_url: user.avatar_url,
                username: user.username,
                email: user.email
            })
        }
    }, [user])

    function handleForm(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleErrors(errors) {
        setErrors(errors)
        setTimeout(() => setErrors(null), 3000)
    }

    function handleCancel() {
        setFormData({
            name: user.name,
            avatar_url: user.avatar_url,
            username: user.username,
            email: user.email
        })
        setOpen(false)
    }

    function handleSave() {
        const config = {
            method: 'PATCH',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(formData)
        }

        fetch(`/users/${user.id}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        userContext.setUser(user)
                        setOpen(false)
                    })
                } else {
                    r.json().then(({ errors }) => handleErrors(errors))
                }
            })
    }

    return (
        <>
        <Box component={'form'} sx={{padding: '1rem'}}>
            <TextField
            label="Name"
            name="name"
            type='text'
            sx={{margin: '1rem'}}
            value={formData.name || ''}
            onChange={handleForm}
            />
            <br/>
            <TextField
            label='Username'
            name='username'
            type='text'
            sx={{margin: '1rem'}}
            value={formData.username || ''}
            onChange={handleForm}
            />
            <br/>
            <TextField
            label='Email'
            name='email'
            type='email'
            sx={{margin: '1rem'}}
            value={formData.email || ''}
            onChange={handleForm}
            />
            <br/>
            <TextField
            label='Avatar'
            name='avatar_url'
            type='text'
            sx={{margin: '1rem'}}
            value={formData.avatar_url || ''}
            onChange={handleForm}
            />
        </Box>
        {errors ? errors.map(error => <ErrorMsg error={error} key={error} />) : null}
        <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
        </>
    )
}

export default EditProfile