import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import AdminUserEdit from './AdminEditUser';

function UserCard({ user, handleModifyUsers }) {
    const [open, setOpen] = useState(false)
    const [field, setField] = useState('')
    const [value, setValue] = useState('')

    function handleOpen(field) {
        setOpen(true)
        setField(field)
        setValue(user[field])
    }

    function handleCancel() {
        setOpen(false)
        setField('')
    }

    function handleSubmit(body) {
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(`/users/${user.id}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        handleModifyUsers(user)
                        setOpen(false)
                    })
                }
            })
    }

    return (
        <Card>
            <CardContent >
                <Avatar src={user.avatar_url} sx={{width: 'fit-content', margin: 'auto'}} />
                <Typography variant='title'>{user.name}</Typography>
                <br/>
                <Typography variant='body'>@{user.username}</Typography>
                <br/>
                <Typography variant='body'>{user.email}</Typography>
            </CardContent>
            <CardActions>
                <ButtonGroup sx={{width: 'auto', margin: 'auto'}}>
                    <Button onClick={() => handleOpen('points')}>Points: {user.points}</Button>
                    <Button onClick={() => handleOpen('wins')}>Wins: {user.wins}</Button>
                    <Button onClick={() => handleOpen('losses')}>Losses: {user.losses}</Button>
                </ButtonGroup>
            </CardActions>
            <Dialog open={open} onClose={handleCancel}>
                <AdminUserEdit field={field} value={value} onCancel={handleCancel} onSubmit={handleSubmit} />
            </Dialog>
        </Card>
    )
}

export default UserCard