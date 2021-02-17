import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Grid, Paper, Input, Button, CircularProgress, ButtonGroup, Card, CardHeader, CardMedia, CardContent, CardActions, Container, TextField, Typography  } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import userActions from '../redux/userActions';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    root:{
      display: "flex",
      marginLeft: 100,
      marginRight: 100
    },
    container: {
      padding: theme.spacing(3),
      height: "100vh"
    },
    alert: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}))

const LoginPage = props => {
  const {match, history } = props;
  const classes = useStyles();
  // initializing dispatch & selector
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser) || false;
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [loading, setLoading] = useState(false)
  //Validation Alerts
  function Alert(props) {
    return <div><MuiAlert elevation={6} variant="filled" {...props} /></div>;
  }
  const passErrorAlert = () => {
    return (
      <div className={classes.alert}>
        <Alert severity="error">"Password can not be empty!"</Alert>
      </div>
    )
  }
  const emailErrorAlert = () => {
    return (
      <div className={classes.alert}>
        <Alert severity="error">"Email can not be empty!"</Alert>
      </div>
    )
  }
  // controlled form functions
  const handleSubmit = e => {
    e.preventDefault();
    console.log(loginForm)
    if (loginForm.email.length === 0){
      setEmailError(true)
    
    }
    if (loginForm.password.length === 0){
      setPassError(true)
    }
    
    if (loginForm.email.length > 0 && loginForm.password.length > 0){
      setLoading(true)
      console.log(user)
      dispatch(userActions.loginUserToDB(loginForm));
      console.log(user)
      if(!!user){
        setLoading(false)
        history.push('/home')
      }
    }
  
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
                  required={true}
                  error={emailError}
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
                  required={true}
                  error={passError}
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
        <div style={{marginTop: 10}}>
          <Button color="primary" fullwWidth onClick={() => history.push("/signup")}>Don't have an account? click here to signup</Button>
        </div>
      </form>
    </Container>
    
        </>

  return (
    <div style={{paddingTop: 60}}>
    {emailError ? emailErrorAlert() : <></>}
    {passError ? passErrorAlert() : <></>}
    {!loading ? login : <div className={classes.container}><CircularProgress /></div>}
    </div>
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