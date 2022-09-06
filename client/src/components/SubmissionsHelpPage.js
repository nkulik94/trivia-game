import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SubmissionHelpPage() {
    return (
        <Box sx={{marginTop: '2rem'}}>
            <Typography variant="h3">Submitting Questions</Typography>
            <br/>
            <Typography variant="h6">Overview:</Typography>
            <Typography variant="body" >
                Users have the ability to submit questions for the database and earn points. Getting a question added to
                the database is a two-step process. First, the submitted question must be apporved. This can happen in one
                of two ways. The simple way is if a site admin approves it. However, even if a submission is not approved by
                an admin, it will automatically gain approval if it receives 50 upvotes. Upon approval, the question will be added
                to the database after being reviewed for accuracy, upon which the user who submitted it will be credited 100
                points.
            </Typography>
            <br/>
            <br/>
            <Typography variant="h6">How to Submit:</Typography>
            <Typography variant="body">
                Submitting a question is simple. Upon clicking the "submit a question" button above the submission list on the dashboard,
                a user will be prompted to enter a question and an answer (don't worry about providing other incorrect options, our admins
                will take care of that!). Upon submission, the question will be added to a general list of submissions available to all users,
                where it can receive upvotes. It will also be made available for our admins to review.
            </Typography>
            <br/>
            <br/>
            <Typography variant="h6">What To Do Next:</Typography>
            <Typography variant="body">
                Nothing! You will be notified by email if and when your submission is approved, and again once it has been added to the
                database. Your account will be automatically be credited 100 points once the question is added.
            </Typography>
        </Box>
    )
}

export default SubmissionHelpPage