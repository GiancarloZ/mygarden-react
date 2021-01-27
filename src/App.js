import React from 'react';
import './App.css';
import {Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Routes from './Routes';
import {Switch} from 'react-router-dom'
import NavBar from './Components/NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    margin: 0,
    padding: 0
  },
  paper: {
    height: "100%",
    width: "100%",
    margin: 0,
    padding: 0
  },
  control: {
    padding: theme.spacing(2),
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      // paddingLeft: 240,
    },
  }
}));
function App() {
  const classes = useStyles();
  return (
    <>
    <NavBar />
    <div className={classes.main}>
      
    <Switch>
      <Routes />
    </Switch>
    </div>
</>
    
  );
}

export default App;

