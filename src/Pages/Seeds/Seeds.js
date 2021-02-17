import React, { useState, useEffect }  from 'react'
import {IconButton, Typography, Grid, Paper, Button, Container, Card, CardHeader, CardMedia, CardContent, CardActions  } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 64,
    },
    container: {
      padding: theme.spacing(3),
      // paddingTop: 100
      marginTop: 64
    },
}))
const Seeds = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const [count, setCount] = useState(1)
    const [loading, setLoading] = React.useState(false);
    const seeds = props.props

    const onPlantClick = () => {
        history.push("/home")
    }

    useEffect(()=>{
        setLoading(true)
        seeds && setLoading(false)
    }, [seeds])

    const seedCard = (seedId, loading) => {
        const seed = seeds[seedId]
        return (
            <Grid item xs={12} md={3}>
                        <Card style={{width: "100%"}}>
                            <CardHeader
                                title={seed ? seed.title : ""}
                                subheader={seed ? seed.scientificName : ""}
                            />
                            <img style={{width: "50%", height: 200}} src={seed ? seed.images[0] : "https://www.pepperseeds.eu/pub/media/catalog/product/cache/b56a9049443cfaeedfe24666b14227c1/j/a/jalapeno_tam.jpg"}/>
                            <img style={{width: "50%", height: 200}} src={seed ? seed.images[1] : "https://cdn.shopify.com/s/files/1/2954/2248/products/Pepper-Tam-Jalapeno-Vegetable-Ferry-Morse_1400x.jpg?v=1608227754"}/>
                        <CardContent>
                        <Typography variant="caption" color="textSecondary" component="p" gutterBottom>
                        Brand: <b>{seed ? seed.company : ""}</b>
                        </Typography>
                        <Typography variant="body1" color="textPrimary" component="p" gutterBottom>
                            {seed ? seed.summary :  ""}
                        </Typography>
                        <div style={{}}><Typography variant="caption" gutterBottom>submitted by: {seed && seed.user["firstName"] ? seed.user["firstName"] : seed.user["id"]}</Typography></div>

                        </CardContent>
                        <CardActions style={{justifyContent: "center"}}>
                        <Button size='small'  onClick={() => history.push(`/seeds/${seed ? seed.id : ""}`)}>See More</Button>
                        </CardActions>
                        <CardActions style={{justifyContent: "space-between"}}>
                            <IconButton aria-label="down" onClick={()=> count > 0 ? setCount(count - 1) : setCount(0)}>
                                <ArrowLeftIcon/>
                            </IconButton>
                            <Typography variant="body1" color="textPrimary" component="p">
                                {count}
                            </Typography>
                                
                            <IconButton aria-label="up" onClick={()=> setCount(count + 1)}>
                                <ArrowRightIcon/>
                            </IconButton>
                            <Button size='large' variant="outlined" onClick={onPlantClick}>Plant</Button>
                        </CardActions>
                        </Card> 
                    </Grid>
        )
    }
    return (
        <div className={classes.root}>
        <Container maxWidth="lg">
            <Grid container spacing={3}>
            {!loading && seeds.length > 0 &&
                Object.keys(seeds).map(
                    (seedId, loading) =>  
                    // seeds[seedId].name.includes(filter) &&
                    seedCard(seedId, loading)
                )        
            }
            </Grid>
         
        </Container>
        </div>
    )
}

export default Seeds    