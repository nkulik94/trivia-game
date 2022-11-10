import React from "react";
import Paper  from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Demos() {
    return (
        <Paper sx={{marginTop: '3rem', padding: '1.5rem'}}>
            <Typography variant="h4">Demo Videos</Typography>
            <Grid container spacing={2} sx={{marginTop: '1rem'}}>
                <Grid item xs={6}>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/jksncUyl4JM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </Grid>
                <Grid item xs={6}>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/Cfq0JNiC3dE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Demos