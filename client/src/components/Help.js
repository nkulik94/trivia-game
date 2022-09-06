import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Link as RouterLink } from 'react-router-dom';
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rules from "./Rules";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SubmissionHelpPage from "./SubmissionsHelpPage";
import PointsHelpPage from "./PointsHelpPage";

function Help() {
    const user = useContext(UserContext).user
    const [value, setValue] = useState('rules')

    const bothLinks = (
        <Grid container spacing={3} sx={{width: '50%', margin: 'auto'}}>
            <Grid item xs={6}>
                <Link sx={{width: 'auto', margin: 'auto'}} component={RouterLink} to='/'>Back to Home</Link>
            </Grid>
            <Grid item xs={6}>
                <Link sx={{width: 'auto', margin: 'auto'}} component={RouterLink} to='/dashboard'>Dashboard</Link>
            </Grid>
        </Grid>
    )

    let page
    switch (value) {
        case 'points':
            page = <PointsHelpPage />;
            break;
        case 'submissions':
            page = <SubmissionHelpPage />;
            break;
        default:
            page = <Rules />
    }

    return (
        <Container>
            <Paper sx={{margin: '3rem', padding: '2rem'}}>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="h2">Help Center</Typography>
                    {user ? bothLinks : <Link component={RouterLink} to='/'>Back to Home</Link>}
                </Box>
                <Box>
                    <Tabs value={value} onChange={(_, value) => setValue(value)}>
                        <Tab value='rules' label="game rules" />
                        <Tab value='points' label='points' />
                        <Tab value='submissions' label='submissions'/>
                    </Tabs>
                </Box>
                {page}
            </Paper>
        </Container>
    )
}

export default Help