import React, { useContext, useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdminAuth from './AdminAuth';

function Profile({ setOpen }) {
    const userContext = useContext(UserContext)
    const history = useHistory()
    const [visible, setVisible] = useState(userContext.user && userContext.user.is_admin)

    useEffect(() => {
        if (userContext.user && userContext.user.is_admin) {
            fetch('/admin-session')
                .then(r => r.ok ? setVisible(false) : setVisible(true))
        }
    }, [userContext.user])

    function handleLogOut() {
        fetch('/logout', {method: 'DELETE'})
            .then(r => {
                if (r.ok) {
                    history.push('/')
                    userContext.setUser(null)
                    userContext.setUpvoteIds({})
                }
            })
    }

    return (
        <Card sx={{textAlign: 'center'}}>
            <Avatar
                src={userContext.user.avatar_url}
                alt={userContext.user.name}
                sx={{width: 100, height: 100, margin: 'auto'}}
            />
            <Typography variant='h4'>{userContext.user.name}</Typography>
            <Typography variant="h5">@{userContext.user.username}</Typography>
            <Button onClick={() => setOpen(true)}>Edit Profile</Button>
            {visible ? <AdminAuth setVisible={setVisible}/> : null}
            <Typography variant='h6'>Points: {userContext.user.points}</Typography>
            <Typography variant="h6">Record: {userContext.user.record}</Typography>
            <Link component={RouterLink} to='/'>Home</Link>
            <br/>
            <Button color='error' onClick={handleLogOut}>Log Out</Button>
        </Card>
    )
}

export default Profile