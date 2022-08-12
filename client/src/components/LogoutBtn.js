import React, { useContext } from 'react';
import { UserContext } from "../context/user"
import Button from '@mui/material/Button';

function LogOutBtn() {
    const userContext = useContext(UserContext)

    function handleLogout() {
        fetch('/logout', {method: 'DELETE'})
        .then(r => {
            if (r.ok) {
                userContext.setUser(null)
            }
        })
    }
    return <Button onClick={handleLogout}>Log Out</Button>
}

export default LogOutBtn