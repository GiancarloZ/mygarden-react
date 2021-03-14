import React, {useEffect} from 'react'
import {Grid, Fab, Paper, Accordion, AccordionSummary, AccordionDetails, Card, CardMedia, CardContent, CardActionArea, Collapse, Button, Container, Typography, List, ListItem, ListItemText, ListItemIcon, Divider  }from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: "#336600",
        height: "100vh"
    },
    container: {

    },
    fab: {
        justifyContent: "center", 
        width: "100%", 
        alignItems: "flex=-end", 
        position: "fixed", 
        bottom: 10,
        display: "flex"
    },
    lists: {
    //    textAlign: 'center' 
    },
    title: {
        // width: "100%"
    },
    grid: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    summary: {
        padding: 0, 
    },
    content: {
        margin: 0,
        display: "grid",
        textAlign: "center"
    }
}));
const Dashboard = ({props}) => {
    const classes = useStyles();
    const {seedsList, gardensList, currentUser, plantsList, history} = props;
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const userGardens = Object.values(gardensList).filter((e) => currentUser.id === e.userId)
    console.log(userGardens)
    const planted = []
    userGardens.map(userGarden => {
        planted.push(Object.values(plantsList).filter((e) => userGarden.id === e.gardenId))
        console.log(planted)
    })
        
    const plantName = (plant) => {
        if (plant !== undefined){
        const seed = Object.values(seedsList).filter((e) => plant.seedId === e.id)
        console.log(seed)

        return seed[0]?.title
        } 
    }
    const dateConv = (date) => {
        let dateTime = date.split("-")
        let year = dateTime[0]
        let day = dateTime[2].slice(0, 2)
        let month = dateTime[1]
        
        let newDate = month + "-" + day + "-" + year
        return newDate
    }
    return (
        <div className={classes.root}>
        <Container className={classes.container} maxWidth="lg">
            <Grid container spacing={2} className={classes.container}>
                {userGardens.map((garden => (
                          <>
                    <Grid item xs={12} md={4}>
                    <Accordion style={{backgroundColor: "#ff9900"}} >   
                        <AccordionSummary classes={{root: classes.summary, content: classes.content}}>         
                        <Grid item container xs={12} style={{textAlign: "center", marginBottom: 5, justifyContent: "center"}}>
                            <Typography  variant="h5" color="textPrimary">
                                {garden.name }
                            </Typography>
                            <Divider/> 
                            <Grid item container>
                            <Grid item xs={6}>
                            <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                                # of Plants: <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).length :  "N/A"}</b>
                            </Typography>
                            </Grid>
                            <Grid item xs={6}>
                            {/* <Divider orientation="vertical" /> */}
                            <Typography variant="subtitle1" color="textPrimary" component="span">
                                Created:  <b>{garden ? dateConv(garden.createdAt) :  "N/A"}</b>
                            </Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                        
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
                        </AccordionSummary> 
                        <AccordionDetails>
                        <Grid containter>
                        <Grid item  xs={12} className={classes.grid} style={{maxHeight: 15, justifyContent: "flex-end"}}>
                        <Button size="small" onClick={() => history.push(`/gardens/${garden.id}`)}>Go to Garden</Button>
                        </Grid>
                        <Grid item  xs={12} className={classes.grid}>
                        <List disablePadding style={{ width: '100%'}} size="small"> 
                            {Object.values(plantsList).filter((e) => garden.id === e.gardenId).map(plant => (
                                <ListItem disableGutters >
                                    <ListItemText
                                        primary={plantName(plant)} secondary="Name" style={{textAlign: "flex-start", width: "25%"}}/>
                                    <ListItemText
                                        primary={dateConv(plant.plantDate)} secondary="Plant Date" style={{textAlign: "center"}}/>
                                    <ListItemText
                                        primary={plant.stage} secondary="Stage" style={{textAlign: "center"}}/>
                                    <Button style={{justifyContent: "flex-end"}} onClick={() => history.push(`/gardens/${garden.id}/plants/${plant.id}`)} >
                                        <ArrowRightIcon />
                                    </Button>
                                </ListItem>      
                            ))}
                        </List>
                        </Grid>
                        </Grid>
                        </AccordionDetails>
                    </Accordion>
                    </Grid>
                      
                        <Divider/>
                        </>
                    )))}
                   {userGardens.length === 0 ? <><Typography variant="h6">You have not created any garden. Click the red button below!</Typography> </> : <></>}
            </Grid>
            
            <div className={classes.fab}>
            <Fab color="secondary" aria-label="add" >
                <AddIcon />
            </Fab>
            </div>
        </Container>
        </div>
    )
}
export default Dashboard

// <Card>   
//                         <CardActionArea onClick={handleExpandClick}>                  
//                         <Grid item  xs={12} style={{textAlign: "center", marginBottom: 5}}>
//                              <Typography  variant="h5" color="textPrimary">
//                                 {garden.name }
//                             </Typography>
//                             <Divider/> 
//                             <Grid container>
//                             <Grid item xs={6}>
//                             <Typography variant="subtitle1" color="textPrimary" gutterBottom>
//                                 # of Plants: <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).length :  "N/A"}</b>
//                             </Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                             {/* <Divider orientation="vertical" /> */}
//                             <Typography variant="subtitle1" color="textPrimary" component="span">
//                                 Created:  <b>{garden ? dateConv(garden.createdAt) :  "N/A"}</b>
//                             </Typography>
//                             </Grid>
//                             </Grid>
//                         </Grid>
                     
//                         <Grid item xs={12} className={classes.grid} >  
//                             <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
//                                 Seed Stage <Divider/> <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).length :  "N/A"}</b>
//                             </Typography>

//                             <Divider orientation="vertical" />

//                             <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
//                                 Sprout Stage <Divider/> <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).length :  "N/A"}</b>
//                             </Typography>
                        
//                             <Divider orientation="vertical" />

//                             <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
//                                 Seedling Stage  <Divider/>  <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).length :  "N/A"}</b>
//                             </Typography>
                            
//                             <Divider orientation="vertical" />

//                             <Typography style={{textAlign: "center"}} variant="body1" color="textPrimary" >
//                                 Maturity Stage
//                                 <Divider component="p"/> 
//                                 <b>{garden ? Object.values(plantsList).filter((e) => garden.id === e.gardenId).length :  "N/A"}</b>
//                             </Typography>
//                         </Grid>
//                         </CardActionArea>
//                         <Collapse in={expanded} timeout="auto" unmountOnExit>
//                             <CardContent>
//                             <Typography paragraph>
//                                 Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
//                                 heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
//                                 browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
//                                 and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
//                                 pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
//                                 saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
//                             </Typography>
//                             </CardContent>
//                         </Collapse>

//                     </Card>