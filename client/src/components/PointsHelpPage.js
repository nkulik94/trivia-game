import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function PointsHelpPage() {
    return (
        <Box sx={{marginTop: '2rem'}}>
            <Typography variant="h3">Points</Typography>
            <br/>
            <Typography variant='h6'>Overview:</Typography>
            <Typography variant="body">
                Points are the "currency" of Backward Jeopardy. Upon creating an account, a user will be automatically
                credited 500 points. <strong>This is the only time you will be able to obtain points without earning them
                in some fashion</strong>
            </Typography>
            <br/>
            <br/>
            <Typography variant="h6">Earning Points:</Typography>
            <Typography variant="body">
                There are two ways to earn points. The simplest is through gameplay. Keep in mind that this carries inherent
                risk, as in order to win points you need to "bet" existing points (see rules for how this works). If your account
                runs out of points, you will be unable to play games unless you earn more points throught the second way, submissions.
                Each approved submission can result in 100 points being credited to your account. See the submissions page for more details.
            </Typography>
        </Box>
    )
}

export default PointsHelpPage