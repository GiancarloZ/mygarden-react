import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Grid, Paper, Input, Button, ButtonGroup, Card, CardHeader, CardMedia, CardContent, CardActions, Container, TextField, Typography  } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import userActions from '../redux/userActions';
const useStyles = makeStyles(theme => ({
    root:{
      display: "flex",
      paddingTop: 60,
      marginLeft: 100,
      marginRight: 100

    },
    container: {
      padding: theme.spacing(3),
      // paddingTop: 100
      marginTop: 64
    },

}))
const LoginPage = props => {
  const {match, history } = props;
  const classes = useStyles();
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  // controlled form functions
  const handleSubmit = e => {
    e.preventDefault();
    console.log(props.history)
    console.log(props)
    console.log(loginForm)
    dispatch(userActions.loginUserToDB(loginForm));
    history.push('/home');
  };
  const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { username, password } = loginForm;

  const login = <>
   <Container className={classes.container} maxWidth="xs">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Typography variant="h4" align={"center"} gutterBottom>Log In</Typography>
                <TextField 
                  fullWidth 
                  label="Email" 
                  name="email" 
                  size="small" 
                  variant="outlined" 
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth onClick={handleSubmit} variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    
        </>

  return (
    <>
    {login}
    </>
  );
};

export default LoginPage;

//<Card aria-labelledby="login-card-form" className={classes.root} id="login-card">
            // <CardHeader id="form-dialog-title">
            //   <h1>Login Page</h1>
            // </CardHeader>
            // <CardContent>
            
            // Please enter username and password to log in.
       
            // <form onSubmit={handleSubmit}>
       
            // <Input
            //     autoFocus={true}
            //     type="text"
            //     name="username"
            //     value={username}
            //     onChange={handleChange}
            //     placeholder="Username"
            // />
            // <Input
            //     type="password"
            //     name="password"
            //     value={password}
            //     onChange={handleChange}
            //     placeholder="Password"
            // />
            // </form>
            // </CardContent>
            // <CardActions>
            // <Button onClick={handleSubmit} color="primary">
            //     Submit
            // </Button>
            {/* <Button onClick={handleClose} color="primary">
                Cancel
            </Button> */}
            
            // </CardActions>
//        </Card> 