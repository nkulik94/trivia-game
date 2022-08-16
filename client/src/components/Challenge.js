import React from "react";
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";

function Challenge({ challenge }) {
    return (
        <ListItem
        secondaryAction={
            <Button>Accept</Button>
        }
        >
            <ListItemAvatar>
                <Avatar alt={challenge.user_username} src={challenge.user_avatar}/>
            </ListItemAvatar>
            <ListItemText
                primary={`Stakes: ${challenge.stakes}`}
                secondary={
                    <>
                    <Typography variant="body">{`User: ${challenge.user_username}`}</Typography>
                    <br/>
                    <Typography variant="body">{`Win/Loss Record: ${challenge.user_record}`}</Typography>
                    </>
                }
            />
        </ListItem>
    )
}

export default Challenge