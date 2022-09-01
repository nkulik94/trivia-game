import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdminMenu from './AdminMenu';

function AdminAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#b71c1c'}}>
        <Toolbar>
          <AdminMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Only
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AdminAppBar