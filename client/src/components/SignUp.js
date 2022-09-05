import React, { useState, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { UserContext } from '../context/user'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ErrorMsg from './ErrorMsg';

function SignUp() {
  const userContext = useContext(UserContext)
  const history = useHistory()

  const [formData, setFormData] = useState({
      name: '',
      email: '',
      username: '',
      password: '',
      password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)

  function handleForm(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleError(errors) {
    setErrors(errors)
    setTimeout(() => setErrors(null), 3000)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch('/signup', config)
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            setFormData({
              name: '',
              email: '',
              username: '',
              password: '',
              password_confirmation: ''
            })
            userContext.setUser(user)
            history.push('/dashboard')
          })
        } else {
          r.json().then(({ errors }) => handleError(errors))
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleForm}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password-confirmation"
                  autoComplete="new-password"
                  value={formData.password_confirmation}
                  onChange={handleForm}
                />
              </Grid>
            </Grid>
            {errors ? errors.map(error => <ErrorMsg error={error} key={error}/>) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default SignUp