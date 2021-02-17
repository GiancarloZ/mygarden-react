import React, { useState, useEffect }  from 'react'
import {Fab, GridList, GridListTile, GridListTileBar, Typography, Grid, Paper, Button, Container, Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea, Divider  } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter, useHistory, useParams} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 64,
    },
    container: {
        padding: theme.spacing(3),
        // paddingTop: 100
        marginTop: 64
    },
    grid: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    imgRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: "auto",
    },
    // fab: {
    //     justifyContent: "center", 
    //     width: "100%", 
    //     alignItems: "flex-end", 
    //     display: "flex"
    // },
}))

const Garden = ({props, match, history}) => {
    const classes = useStyles(); 
    const dispatch = useDispatch()
    const [garden, setGarden] = useState();
    console.log(props)
    const {seedsList, gardensList, plantsList, plantImagesList} = props;

    useEffect(() => {

        const {id} = match.params
        const foundGarden = gardensList.filter(s => parseInt(id) === s.id);
        // Check if garden exists
        if (foundGarden.length < 1) {
            history.push('/home');
        } else {
            // Select seed from list and store
            setGarden(foundGarden[0]);
        }
  
    }, [garden])

    const dateConv = (date) => {
        let dateTime = date.split("-")
        let year = dateTime[0]
        let day = dateTime[2].slice(0, 2)
        let month = dateTime[1]
        
        let newDate = month + "-" + day + "-" + year
        return newDate
    }
    const plantName = (plant) => {
        if (plant != undefined){
        const seed = Object.values(seedsList).filter((e) => plant.seedId === e.id)
        console.log(seed)

        return seed[0].title
        } 
    }
    return (
        <div className={classes.root}>
        <Container maxWidth="lg" style={{justifyContent: "center"}}>
            <Grid container spacing={3}> 
                <Grid item xs={12} md={6}>
                    <Card style={{width: "100%"}}>
                    <Button variant="text" color="secondary" style={{margin: 5}} onClick={() => history.goBack()}>
                        Back
                    </Button>  
                        <CardHeader
                            title={garden ? garden.name : ""}
                            subheader={garden ? garden.scientificName : ""}
                        />
                        <img style={{width: "100%", height: "auto"}} src={garden && garden.images !== null ? garden.images[0] : "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F03%2F31%2Foutdoor-garden-68ab0d92.jpg"}/>
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
                    <CardContent>
                    <Grid item xs={12} className={classes.grid} >  
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
                    </Grid>
                    </CardContent>
                    <CardActions style={{justifyContent: "center"}}>
                    </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                {garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).map(plant => (
                <>
                    <Card style={{ margin: 5}}>
                        <CardActionArea onClick={() => history.push(`/gardens/${garden.id}/plants/${plant.id}`)}>
                            <CardHeader title={plantName(plant)} subheader={`Planted on: ${plant.plantDate ? dateConv(plant.plantDate) : dateConv(plant.createdAt)}`}/>
                        </CardActionArea>  
                        <div className={classes.imgRoot}>
                        <GridList cellHeight={160} className={classes.gridList} cols={3}>
                            {plant && Object.values(plantImagesList).filter((e) => plant.id === e.plantId).length > 0 ? Object.values(plantImagesList).filter((e) => plant.id === e.plantId).reverse().map((tile, index) => (
                            <GridListTile key={tile.img} cols={index === 0 ? 2 : 1}>
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                />
                            </GridListTile>
                            )) : <Typography variant="p" style={{padding: 5, width: "100%"}} >No Images. Click button below to add a photo update</Typography>}
                
                        </GridList>
                        <Button fullWidth color="secondary" aria-label="add" style={{height: 60}}>
                            <AddIcon />
                        </Button>
                        </div>
                    </Card>
                </>)) : <></>}

                </Grid>
            </Grid>
        </Container>
        </div>
    )
}

export default withRouter(Garden)    