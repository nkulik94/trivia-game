import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function QuestionListItem({ question, handleEdit }) {
    if (!question) return <div></div>
    
    return (
        <ListItem secondaryAction={<Button onClick={() => handleEdit(question.id)}>Edit</Button>}>
            <ListItemText
            sx={{marginRight: '7%', overflow: 'auto'}}
            primary={
                <>
                <Typography variant="title">{question.question}</Typography>
                </>
            }
            secondary={
                <>
                <Typography variant="title">{question.correct_answer}</Typography>
                </>
            }
            />
        </ListItem>
    )
}

export default QuestionListItem