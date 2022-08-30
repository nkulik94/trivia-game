import React, { useContext } from "react";
import { UserContext } from "../context/user";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";

function SubmittedQuestion({ question }) {
    const userContext = useContext(UserContext)

    const user = question.user && question.user.id !== userContext.user.id ? question.user : userContext.user

    return (
        <ListItem
        secondaryAction={
            <Button>Edit</Button>
        }
        >
            <ListItemAvatar>
                <Avatar src={user.avatar_url} alt={user.name} />
            </ListItemAvatar>
            <ListItemText

            />
        </ListItem>
    )
}

export default SubmittedQuestion