import React, {useState, useEffect} from 'react'
import {List, ListItem, ListItemText, CircularProgress, Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChooseGarden = ({open, setOpen, currentUser, gardensList, history }) => {

    const [gardens, setGardens] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(currentUser)
    console.log(loading)
    useEffect(() => {
        setLoading(true)
        const foundGardens = gardensList.filter(s => currentUser.id === s.userId)
        if (foundGardens.length > 0){
            setGardens(foundGardens)
            setLoading(false)
        }

    }, [currentUser, gardensList])

    const  handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Please select a garden?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {loading && currentUser.length > 0 && <div style={{textAlign: "center"}}><CircularProgress/></div>}
                    {loading && (currentUser.length === 0 || currentUser.length === undefined)  && <>You must be signed in to choose a garden <br></br><div style={{textAlign: "center", marginTop: "30px"}}><Button variant="outlined"onClick={() => history.push('/login')}>Login</Button></div></>}
                    {!loading && gardens.length > 0 && 
                        <>
                        {gardens.map(garden => (
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem button>
                                <ListItemText primary={garden.name} />
                                </ListItem>
                            </List>
                        ))}
                    </>}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
            
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default ChooseGarden