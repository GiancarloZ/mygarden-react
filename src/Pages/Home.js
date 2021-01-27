import React, {useEffect} from 'react'
import {Grid, Paper, CardMedia, Button, Container, Typography }from "@material-ui/core"
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Switch, useLocation, Route, useHistory} from 'react-router-dom'
import userActions from '../redux/userActions';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 64,
        backgroundColor: "#336600",
        height: "100%"
    },
    first: {
        paddingTop: 32,
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 64
    },
  
}));
  
const Home = () => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(userActions.persistUser())
       
      }, [dispatch])


    return (
        <div className={classes.root}>
        <Container className={classes.first} align="center" maxWidth="md">
            <Typography variant="h3" gutterBottom>
                WELCOME TO myGarden
            </Typography>
            <Typography variant="h5" style={{marginTop: 30}} gutterBottom>
                Your real garden in the virtual world.
            </Typography>
            <Button style={{marginTop: 32}} variant="contained" onClick={() => history.push("/signup")} > Sign Up</Button>
        </Container>
        <Container className={classes.first} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Search through our database of Seeds or add your own.
            </Typography>
            <Button style={{marginTop: 32}} variant="contained" onClick={() => history.push("/seeds")}>Browse Seeds</Button>
        </Container>
        <Container className={classes.first} maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Plant seeds into your virtual Garden, take photos of your progress, and share
                with community. 
            </Typography>
            <Button style={{marginTop: 32}} variant="contained" onClick={() => history.push("/signup")}>Start Planting</Button>
        </Container>
        </div>
    )
}

export default Home

   {/* <Grid direction container style={{paddingTop: 60}} >
            <Grid item xs={0}  sm={1}  > <Paper></Paper></Grid>
                <Grid item xs={12}  sm={10} > */}
                
                {/* {<img style={{width: "100%"}} src={} />} */}
             
                {/* </Grid> 
            <Grid item xs={0} sm={1} ><Paper></Paper></Grid>
        </Grid> */}