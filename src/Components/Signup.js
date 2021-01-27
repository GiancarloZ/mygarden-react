import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/userActions';
import { useSelector } from 'react-redux';
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  const user = useSelector(state => state.currentUser.email) || false;
  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: ''
  });
  const [open, setOpen] = React.useState(false);
  // Controlled form functions
  const handleChange = e => 
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    
  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;
    dispatch(userActions.newUserToDB(signupForm));
    console.log(signupForm)
    console.log("here")
    history.push('/home')
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
        </form>
      </Container>
      </>

  // Component code
  return (
      <>
      {signup}
      </>
  );
};

export default Signup;