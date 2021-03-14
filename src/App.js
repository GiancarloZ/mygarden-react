import React, {useEffect} from 'react';
import './App.css';
import {Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Routes from './Routes';
import {Switch} from 'react-router-dom'
import NavBar from './Components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import seedActions from './redux/seedActions';
import gardenActions from './redux/gardenActions';
import userActions from './redux/userActions';
import plantActions from './redux/plantActions';
import plantImageActions from './redux/plantImageActions';

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
    height: "100vh",
    backgroundColor: "#336600",
    [theme.breakpoints.up('sm')]: {
      // paddingLeft: 240,
    },
  }
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const seeds = useSelector(state => state.seeds)
  const gardens = useSelector(state => state.gardens)
  const user = useSelector(state => state.currentUser)
  const plants = useSelector(state => state.plants)
  const plantImages = useSelector(state => state.plantImages)

  useEffect(async()=>{
    await 
    dispatch(gardenActions.loadAllGardens())
    dispatch(seedActions.loadAllSeeds())
    dispatch(userActions.persistUser())
    dispatch(plantActions.loadAllPlants())
    dispatch(plantImageActions.loadAllPlantImages())
  }, [dispatch])


  return (
    <>
      <NavBar />
      <div className={classes.main}>
      <React.Suspense fallback={<span>Loading...</span>}>    
        <Switch>
          <Routes currentUser={user} seedsList={seeds} gardensList={gardens} plantsList={plants} plantImagesList={plantImages}/>
        </Switch>
      </React.Suspense>
    </div>
    </>
    
  );
}

export default App;

