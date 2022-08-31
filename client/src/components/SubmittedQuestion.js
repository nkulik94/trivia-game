import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import SubmissionAction from "./SubmissionAction";
import { Typography } from "@mui/material";

function SubmittedQuestion({ question, callback }) {
    const userContext = useContext(UserContext)

    const user = question.user && question.user.id !== userContext.user.id ? question.user : userContext.user

    return (
        <ListItem
        secondaryAction={
            <SubmissionAction
                isUser={user.id === userContext.user.id}
                id={question.id}
                callback={callback}
                submission={{question: question.question, answer: question.answer}}
            />
        }
        >
            <ListItemAvatar>
                <Avatar src={user.avatar_url} alt={user.name} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                    <Typography variant="body">@{user.username}</Typography>
                    <br/>
                    <Typography variant="body"><strong>Question:</strong> {question.question}</Typography>
                    <br/>
                    <Typography variant="body"><strong>Answer:</strong> {question.answer}</Typography>
                    </>
                }
                secondary={
                    <>
                    <Typography variant='body'>Status: {question.status}</Typography>
                    <br/>
                    <Typography variant="body">Upvotes: {question.upvote_count}</Typography>
                    </>
                }
            />
        </ListItem>
    )
}

export default SubmittedQuestion