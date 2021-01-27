import React, { useState, useEffect }  from 'react'
import {Typography, Grid, Paper, Button, Container, Card, CardHeader, CardMedia, CardContent, CardActions  } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import seedActions from '../redux/seedActions';
import {Switch, useLocation, Route, useHistory} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 64,
    },
    container: {
      padding: theme.spacing(3),
      // paddingTop: 100
      marginTop: 64
    },
}))
const Seeds = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const seeds = useSelector(state => state.seeds)
    console.log(seeds[0] ? seeds[0].images[0] : false)
    useEffect(()=>{
        // dispatch(userActions.persistUser())
        dispatch(seedActions.loadAllSeeds())
      }, [dispatch])
    
    return (
        <div className={classes.root}>
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card style={{width: "100%"}}>
                        <CardHeader
                            title={seeds[0] ? seeds[0].title : ""}
                            subheader={seeds[0] ? seeds[0].scientificName : ""}
                            />
                        <CardMedia 
                            image={seeds[0] ? seeds[0].images[0] : ""}
                            title="Javascript"
                            style={{width: 150}}
                            />
                            <img style={{width: "50%", height: 200}} src="https://www.pepperseeds.eu/pub/media/catalog/product/cache/b56a9049443cfaeedfe24666b14227c1/j/a/jalapeno_tam.jpg"/>
                            <img style={{width: "50%", height: 200}} src="https://cdn.shopify.com/s/files/1/2954/2248/products/Pepper-Tam-Jalapeno-Vegetable-Ferry-Morse_1400x.jpg?v=1608227754"/>
                    <CardContent>
                    <Typography variant="caption" color="textSecondary" component="p" gutterBottom>
                       Brand: <b>{seeds[0] ? seeds[0].company : ""}</b>
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {seeds[0] ? seeds[0].summary :  ""}
                    </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: "flex-end"}}>
                        <Button size="small" align="right" onClick={() => history.push(`/seeds/${seeds[0] ? seeds[0].id : ""}`)}>See More</Button>
                    </CardActions>
                    </Card> 
                
                </Grid>
            </Grid>
         
        </Container>
        </div>
    )
}

export default Seeds    