import React, { useState, useEffect }  from 'react'
import {IconButton, Divider, Typography, Grid, Paper, Button, Container, Card, CardHeader, CardMedia, CardContent, CardActions  } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
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

const Gardens = ({props}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = React.useState(false);
    const {gardensList, plantsList} = props;
    const onPlantClick = () => {
        history.push("/home")
    }

    useEffect(()=>{
        setLoading(true)
        gardensList && setLoading(false)
    }, [gardensList])

    const gardenCard = (gardenId) => {
        const garden = gardensList[gardenId]
        const seeds = garden.planted
        const dateConv = (date) => {
            let dateTime = date.split("-")
            let year = dateTime[0]
            let day = dateTime[2].slice(0, 2)
            let month = dateTime[1]
            
            let newDate = month + "-" + day + "-" + year
            return newDate
        }
        return (
            <Grid item xs={12} md={6}>
                <Card style={{width: "100%"}} raised="true">
                    <CardHeader
                        title={garden ? garden.name : ""}
                        subheader={garden ? garden.scientificName : ""}
                        style={{justifySelf: "center", textAlign: "center"}}
                    />
                    <img style={{width: "100%", height: "auto"}} src={garden && garden.images !== null ? garden.images[0] : "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F03%2F31%2Foutdoor-garden-68ab0d92.jpg"}/>
                    {/* <img style={{width: "100%", height: 350}} src={garden && garden.images !== null ? garden.images[1] : "https://i.pinimg.com/originals/bd/35/10/bd3510d9810fe2204d3291ddf898897f.jpg"}/> */}
                    <div style={{justifyContent: "space-evenly", display: "flex", flexDirection: "row", marginTop: 10}}>
                            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                                # of Plants: <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).length :  "N/A"}</b>
                            </Typography>
                            <Divider orientation="vertical" />
                            <Typography variant="subtitle1" color="textPrimary" component="span">
                                Created:  <b>{garden ? dateConv(garden.createdAt) :  "N/A"}</b>
                            </Typography>
                        <Divider/>
                    </div>
                <CardContent style={{justifyContent: "space-evenly", display: "flex", flexDirection: "row"}}>
                
                <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
                    Seed Stage <Divider/> <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).filter((p) => p.stage === "SEED").length :  "N/A"}</b>
                </Typography>

                <Divider orientation="vertical" />

                <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
                    Sprout Stage <Divider/> <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).filter((p) => p.stage === "SPROUT").length  :  "N/A"}</b>
                </Typography>
            
                <Divider orientation="vertical" />

                <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
                    Seedling Stage  <Divider/>  <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).filter((p) => p.stage === "SEEDLING").length  :  "N/A"}</b>
                </Typography>
                
                <Divider orientation="vertical" />

                <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
                    Maturity Stage
                    <Divider component="p"/> 
                    <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).filter((p) => p.stage === "MATURITY").length  :  "N/A"}</b>
                </Typography>
                      
                </CardContent>
                <CardActions style={{justifyContent: "center"}}>
                <Button size='large' variant="outlined" fullWidth onClick={() => history.push(`/gardens/${garden ? garden.id : ""}`)}>Enter</Button>
                </CardActions>
                </Card> 
            </Grid>
        )
    }
    return (
        <div className={classes.root}>
        <Container maxWidth="lg">
            <Grid container spacing={3}>
            {!loading && gardensList.length > 0 &&
                Object.keys(gardensList).map(
                    (gardenId) =>  
                    // seeds[seedId].name.includes(filter) &&
                    gardenCard(gardenId)
                )        
            }
            </Grid>
         
        </Container>
        </div>
    )
}
export default Gardens