import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { Link as RouterLink } from 'react-router-dom';
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rules from "./Rules";
import Grid from "@mui/material/Grid";

function Help() {
    const user = useContext(UserContext).user

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

    return (
        <Container>
            <Paper sx={{margin: '3rem', padding: '2rem'}}>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="h2">Help</Typography>
                    {user ? bothLinks : <Link component={RouterLink} to='/'>Back to Home</Link>}
                </Box>
                <Rules />
            </Paper>
        </Container>
    )
}

export default Help