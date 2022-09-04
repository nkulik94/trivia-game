import React from "react";
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function AdminMenuList({ onClickList }) {
    const options = [{name: 'Home', link: '/'}, {name: 'Dashboard', link: '/dashboard'}, {name: 'Questions', link: '/question-list'}, {name: 'Submissions', link: '/admin-submissions-list'}, {name: 'Users', link: '/user-edit'}]

    return (
        <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => onClickList(false)}
        >
            <List>
                {options.map(option => {
                    return (
                        <ListItem key={option.name} disablePadding>
                            <ListItemButton component={Link} to={option.link} >
                                <ListItemText primary={option.name} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

export default AdminMenuList