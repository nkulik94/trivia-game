import React, { useState, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ErrorMsg from './ErrorMsg';

function SignIn() {
  const userContext = useContext(UserContext)
  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false)

  function handleForm(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleError(error) {
    setError(error)
    setTimeout(() => setError(false), 3000)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch('/login', config)
      .then(r => {
        if (r.ok) {
          setFormData({
            email: '',
            password: ''
          })
          r.json().then(user => {
            userContext.setUser(user)
            history.push('/dashboard')
          })
        } else {
          r.json().then(handleError)
        }
      })
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LightbulbIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleForm}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleForm}
            />
            {error ? <ErrorMsg error={error.error} /> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/create-account" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default SignIn