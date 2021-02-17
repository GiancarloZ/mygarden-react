import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {GridList, GridListTile, GridListTileBar, Typography, Grid, Paper, Button, Container, Card, CardHeader, CardMedia, CardContent, CardActions, Divider  } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
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
}))
const Plant = ({props, match, history}) => {
    const {seedsList, gardensList, plantsList, plantImagesList} = props;
    const [garden, setGarden] = useState();
    const [plant, setPlant] = useState();
    const classes = useStyles(); 
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
    console.log(match.params)
    useEffect(() => {
        const {gardenId, plantId} = match.params
    
        const foundGarden = gardensList.filter(s => parseInt(gardenId) === s.id);
        const foundPlant = plantsList.filter(s => parseInt(plantId) === s.id);
        console.log(plantsList)
        console.log(foundPlant)
        console.log(plant)

        // Check if garden exists
        if (foundGarden.length < 1 || foundPlant.length < 1) {
            history.push('/home');
        } else {
            // Select seed from list and store
            setGarden(foundGarden[0]);
            setPlant(foundPlant[0]);
        }
  
    }, [plant])

    return (
        <div className={classes.root}>
      
        <Card>
        <Button variant="text" color="secondary" style={{margin: 5}} onClick={() => history.goBack()}>
            Back
        </Button>  
           {plant ? <CardHeader title={plantName(plant)} subheader={`Planted on: ${plant.plantDate ? dateConv(plant.plantDate) : dateConv(plant.createdAt)}`}/> : <></> }
            <div className={classes.imgRoot}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {plant ? Object.values(plantImagesList).filter((e) => plant.id === e.plantId).reverse().map((tile, index) => (
                <GridListTile key={tile.img} cols={index === 0 ? 2 : 1}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                        title={tile.title}
                    />
                </GridListTile>
                )) : <Typography variant="p">No Images</Typography>}
            </GridList>
            </div>
        </Card> 
        </div>
    )
}
export default withRouter(Plant)