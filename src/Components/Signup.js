import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/userActions';
import { useSelector } from 'react-redux';
import {Button, Container, Grid, TextField, Typography, CircularProgress} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';
const useStyles = makeStyles(theme => ({
  root:{
    display: "flex",
  },
  container: {
    padding: theme.spacing(3),
    height: "80vh"
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  // login: {
  //     padding: theme.spacing(0),
  //     margin: 0,
  //     minWidth: "100%",
  //     minHeight: "100%",
  // }
}))

const Signup = props => {
  const {match, history } = props;
  const classes = useStyles();

  // initializing dispatch
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser) || false;
  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: ''
  });
  const [open, setOpen] = React.useState(false);
  // Controlled form functions
  const handleChange = e => 
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  
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
  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;

    if (signupForm.email.length === 0){
      setEmailError(true)
    
    }
    if (signupForm.password.length === 0){
      setPassError(true)
    }
    
    if (signupForm.email.length > 0 && signupForm.password.length > 0){
      setLoading(true)
      console.log(user)
      dispatch(userActions.newUserToDB(signupForm));
      console.log(user)
      if(!!user){
        setLoading(false)
        history.push('/home')
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(signupForm)
  // Destructuring keys from our local state to use in the form
  const { email, password } = signupForm;
  const signup = <>
      <Container className={classes.container} maxWidth="xs">
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4" align={"center"} gutterBottom>Sign Up</Typography>
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
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <div style={{marginTop: 10}}>
          <Button color="primary" fullwWidth onClick={() => history.push("/login")}>already a user? click here to login</Button>
          </div>
        </form>
      </Container>
      </>

  // Component code
  return (
    <div style={{paddingTop: 60}}>
    {emailError ? emailErrorAlert() : <></>}
    {passError ? passErrorAlert() : <></>}
    {!loading ? signup : <div className={classes.container}><CircularProgress /></div>}
    </div>
  );
};

export default Signup;