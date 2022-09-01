import React, { useContext } from "react";
import { UserContext } from "../context/user";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function QuestionListItem({ question }) {
    if (!question) return <div></div>
    
    return (
        <ListItem secondaryAction={<Button>Edit</Button>}>
            <ListItemText
            primary={
                <>
                <Typography variant="title">{question.question}</Typography>
                </>
            }
            />
        </ListItem>
    )
}

export default QuestionListItem