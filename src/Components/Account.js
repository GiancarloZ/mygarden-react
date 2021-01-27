import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../redux/userActions';

const Account = props => {
    const { handleMenu, anchorEl, setAnchorEl, handleClose, open } = props;
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser.email) || false;
    console.log(user)
    const handleClick = () => {
      history.push("/signup")
      setAnchorEl(false)
    }
    const handleClickLogin = () => {
      history.push("/login")
      setAnchorEl(false)
    }
    const handleLogout = () => {
        console.log("here")
        dispatch(userActions.logoutUser());
        history.push("/home")
      };
    console.log(props)
    return (
        <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {!user ? (
                    <div>
                    <MenuItem onClick={handleClick}>Sign Up</MenuItem>
                    <MenuItem onClick={handleClickLogin}>Log In</MenuItem></div>
                    )
                    :
                    (
                        <div> 
                        <MenuItem onClick={() => history.push("/account")}>Account</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </div>
                        
                    )
                }
              </Menu>
            </div>
    )
}
export default Account