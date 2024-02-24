import React, { useState } from 'react';
import { Box, OutlinedInput, InputAdornment, IconButton, Button, Typography, Container, Grid, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './style.css';
import LaboratoryImage from '../../assets/cdc-XLhDvfz0sUM-unsplash.jpg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Container maxWidth="100%" className="container">
        <Grid container>
          {/* Left Side */}
          <Grid item xs={6} className="leftSide">
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${LaboratoryImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
              }}
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={6} className="rightSide">
            <div className="formContainer">

              <Typography variant="h4" className="title">Sign In</Typography>

              <OutlinedInput placeholder="Email" variant="outlined"  fullWidth margin="normal" className="input" dense /*sx={{ height: '30px',}}*//>
              <OutlinedInput
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                dense
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <Typography variant="body2" component={Link} href="#" className="forgotPassword">Forgot Password?</Typography>

              <Button variant="contained" color="primary" fullWidth className="loginButton">
                Sign in
              </Button>

              <Button variant="outlined" fullWidth className="googleLoginButton">
                Google Login
              </Button>


              {/* <Button variant="contained" fullWidth className="signUpButton">
                Sign Up
              </Button> */}
              <Typography variant="body2" className="paragraph">
                Don't have an account? <Link href="#" className="signUpLink">Sign Up</Link>
              </Typography>

            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
