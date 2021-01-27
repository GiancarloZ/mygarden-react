import React from "react";
import {
  Drawer,
  ListItem,
  List,
  ListItemText,
  Button,
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import Account from "./Account"

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
     display: "none"
    },
    
  },
  nested: {
    // paddingLeft: theme.spacing(4),
    // maxWidth: 250,
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      display: "none"
     },
  },
  sidebar: {
    paddingLeft: theme.spacing(4),
    maxWidth: 200
  },
  drawerPaper: {
    width: drawerWidth,
    height: "100%"
  },
  appBar: {
    maxHeight: 56,
    backgroundColor: "#228B22",
    [theme.breakpoints.up('md')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  arrowButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  toolbar: {
    [theme.breakpoints.up('md')]: {
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: "space-evenly",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const NavBar = props => {
  const { history, window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOnClick = () => {
    history.push("/home")
  }

  const data = [
    {name: "HOME", onClick: () => {
      history.push(`/home`) 
      setMobileOpen(false)
    }}, 
    {name: "SEEDS", onClick: () => {
      history.push(`/seeds`)
      setMobileOpen(false)
    }},
    {name: "GARDENS", onClick: () => {
      history.push(`/gardens`)
      setMobileOpen(false)
    }}, 
    // {name: "LIBRARY", onClick: () => {
    //   history.push(`/library`)
    //   setMobileOpen(false)
    // }}, 
    // {name: "STUDENT PROGRAMS", onClick: () => {
    //   history.push(`/studentprograms`)
    //   setMobileOpen(false)
    // }}, 
    // {name: "JOIN", onClick: () => {
    //   history.push(`/join`)
    //   setMobileOpen(false)
    // }},
    // {name: "CONTACT", onClick: () => {
    //   history.push(`/contact`)
    //   setMobileOpen(false)
    // }},
  ]      
  // for Account Icon
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Button component="h1" style={{fontSize: "1.5rem"}} color="inherit" onClick={handleOnClick}> myGarden </Button>
          {data.map((item) => {
           return(
            <List component="div" >
            <ListItem button={true} className={classes.nested} onClick={item.onClick}>
                <ListItemText primary={item.name} />
            </ListItem>
            </List>
            )})
          }
          <Account handleClose={handleClose} setAnchorEl={setAnchorEl} history={history} handleMenu={handleMenu} anchorEl={anchorEl} open={isOpen}/>
        </Toolbar>

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
<Hidden mdUp implementation="css">
<Drawer
  container={container}
  variant="temporary"
  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
  open={mobileOpen}
  onClose={handleDrawerToggle}
  classes={{
    paper: classes.drawerPaper,
  }}
  ModalProps={{
    keepMounted: true, // Better open performance on mobile.
  }}
>
{data.map((item) => {
                return(
                <List component="div" disablePadding>
                <ListItem button={true} className={classes.sidebar} onClick={item.onClick}>
                    <ListItemText primary={item.name} />
                </ListItem>
                </List>
                )})
                }
    </Drawer>
    </Hidden>
     
   </nav>
</>
  );
};

export default withRouter(NavBar);
