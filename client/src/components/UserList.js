import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchBar from './SearchBar';
import PageButtons from './PageButtons';
import UserCard from './UserCard';

function UserList() {
    const [users, setUsers] = useState([])
    const [searched, setSearched] = useState('')
    const [page, setPage] = useState({start: 0, end: 20})

    const filteredList = users.filter(user => user.email.toUpperCase().includes(searched.toUpperCase()))


    useEffect(() => {
        fetch('/users')
            .then(r => {
                if (r.ok) {
                    r.json().then(setUsers)
                }
            })
    }, [])

    function handleModifyUsers(user) {
        setUsers(users.map(u => u.id === user.id ? user : u))
    }

    return (
        <Container sx={{textAlign: 'center'}}>
            <SearchBar searched={searched} setSearched={setSearched} placeholder={'Email'}/>
            <Grid container spacing={2}>
                {filteredList.slice(page.start, page.end).map(user => {
                    return (
                        <Grid item xs={6} key={user.id}>
                            <UserCard user={user} handleModifyUsers={handleModifyUsers} />
                        </Grid>
                    )
                })}
            </Grid>
            <PageButtons setPage={setPage} count={Math.ceil(filteredList.length / 20)} />
        </Container>
    )
}

export default UserList