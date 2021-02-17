import React, { useState, useEffect }  from 'react'
import {Typography, Grid, Paper, Button, Container, Card, CardHeader, CardMedia, CardContent, CardActions, Divider  } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import seedActions from '../../redux/seedActions';
import {withRouter, useHistory, useParams} from 'react-router-dom'

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
const Seed = ({props, match, history}) => {
    const classes = useStyles(); 
    const dispatch = useDispatch()
    const [seed, setSeed] = useState();

    useEffect(() => {
  
        const {id} = match.params
        const foundSeed = props.filter(s => parseInt(id) === s.id);
        // Check if seed exists
        if (foundSeed.length < 1) {
            history.push('/home');
        }
  
        // Select seed from list and store
        setSeed(foundSeed[0]);
    }, [seed])
    
    return (
        <div className={classes.root}>
        <Container maxWidth="lg" style={{justifyContent: "center"}}>
            <Grid container spacing={3}> 
                <Grid item xs={12} md={6}>
                    <Card style={{width: "100%"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button variant="text" color="secondary" onClick={() => history.goBack()}>
                            Back
                        </Button>
                        <Button variant="text" color="secondary" onClick={() => history.push(`/seeds/${seed.id}/edit`)}>
                            Edit
                        </Button>
                        </div>
                        <CardHeader
                            title={seed ? seed.title : ""}
                            subheader={seed ? seed.scientificName : ""}
                            />
                        {/* <CardMedia 
                            image={seed ? seeds.images[0] : ""}
                            title="Javascript"
                            style={{width: 150}}
                            /> */}
                            <img style={{width: "50%", height: 200}} src={seed ? seed.images[0] : ""}/>
                            <img style={{width: "50%", height: 200}} src={seed ? seed.images[1] : ""}/>
                    <CardContent>
                    <Typography variant="caption" color="textSecondary" component="p" gutterBottom>
                       Brand: <b>{seed ? seed.company : ""}</b>
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {seed ? seed.summary :  ""}
                    </Typography>
                    </CardContent>
                    <Divider/>
                    </Card> 
                </Grid>
                <Grid item xs={12} md={6}>
                <Card style={{width: "100%"}}>
                    <CardHeader
                        title={seed ? seed.description : ""}
                        />
                    <CardContent>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        <b><u> How to Grow:</u></b> <br></br>
                    </Typography>
                    <Divider/>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {seed ? seed.howToGrow : ""}
                    </Typography>
                    <Divider/>
                    <br></br>
                    <Typography variant="body1" color="textPrimary" component="p">
                        <b>Days to Sprout:</b> {seed ? seed.daysToSprout[0] + " - " + seed.daysToSprout[1] :  ""}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        <b>Days to Maturity:</b> {seed ? seed.daysToMaturity :  ""}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        <b>Height At Maturity:</b> {seed ? seed.heightAtMaturity + " (in)" :  ""}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        <b>Row Spacing:</b> {seed ? seed.rowSpacing  + " (in)" :  ""}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        <b>Plant Spacing:</b> {seed ? seed.plantSpacing  + " (in)"  :  ""}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        <b>Planting Depth:</b> {seed ? seed.plantingDepth  + " (in)"  :  ""}
                    </Typography>
                    </CardContent>
                    </Card> 
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}

export default withRouter(Seed)    