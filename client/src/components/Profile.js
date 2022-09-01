import React, { useContext } from "react";
import { UserContext } from "../context/user";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Profile({ setOpen }) {
    const userContext = useContext(UserContext)

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
            <Typography variant='h6'>Points: {userContext.user.points}</Typography>
            <Typography variant="h6">Record: {userContext.user.record}</Typography>
        </Card>
    )
}

export default Profile