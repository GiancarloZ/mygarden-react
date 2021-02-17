import React, {useState, useEffect} from 'react'
import {Grid, Paper, CardMedia, Button, Container, Typography }from "@material-ui/core"
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Switch, useLocation, Route, useHistory} from 'react-router-dom'
import Dashboard from './Dashboard';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 60,
        // backgroundColor: "#336600",
        // height: "100vh"
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
  
const Home = ({props}) => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch();
    const {loading, setLoading} = useState(false)
    const {seedsList, gardensList, currentUser, plantsList} = props;

    // useEffect(() => {
    //     setLoading(true)
    //     if(currentUser.id){
    //         setLoading(true)
    //     }

    // }, [])

    return (
        <div className={classes.root}>
            {currentUser.id && !loading ? <Dashboard props={{seedsList, gardensList, currentUser, plantsList, history}}/> : <>
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
                    <Button style={{marginTop: 32}} variant="contained" onClick={() => history.push("/gardens")}>Start Planting</Button>
                </Container>
                </>}
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