import React, { useContext } from "react";
import { UserContext } from "../context/user";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import SubmissionAction from "./SubmissionAction";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function SubmittedQuestion({ question, callback, editList = null, handleAdminActions = null, value = null }) {
    const userContext = useContext(UserContext)
    const upvoteIds = userContext.upvoteIds

    if (!userContext.user) return <div></div>

    const user = question.user && question.user.id !== userContext.user.id ? question.user : userContext.user

    function handleUpvote() {
        const diff = upvoteIds[question.id] ? -1 : 1
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({upvotes_count: question.upvotes_count + diff})
        }

        fetch(`/submissions/${question.id}`, config)
            .then(r => {
                if (r.ok) {
                    r.json().then(q => {
                        editList(q)
                        upvoteIds[question.id] = !upvoteIds[question.id]
                        userContext.setUpvoteIds({...upvoteIds})
                    })
                }
            })
    }

    const userAction = (
        <SubmissionAction
                isUser={user.id === userContext.user.id}
                id={question.id}
                callback={callback}
                submission={{question: question.question, answer: question.answer}}
                handleUpvote={handleUpvote}
            />
    )

    const adminAction = <Button onClick={() => handleAdminActions(question.question, question.answer, question.id)}>{value}</Button>

    return (
        <ListItem
        secondaryAction={value ? adminAction : userAction}
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
                    <Typography variant="body">Upvotes: {question.upvotes_count}</Typography>
                    </>
                }
            />
        </ListItem>
    )
}

export default SubmittedQuestion