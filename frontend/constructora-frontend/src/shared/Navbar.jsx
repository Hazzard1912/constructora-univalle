import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../store/slices/user/userSlice";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';



export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { displayName  } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
    }

    return(
        <AppBar position="static">
            <Toolbar>
                <div>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0px'}}>Dashboard Administrativo</h1>
                </div>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    style={{ marginLeft: 'auto'}}
                    disableRipple
                >
                    <span style={{ marginRight: '1rem'}}>{displayName}</span>
                    <AccountCircle style={{ fontSize: '2.5rem'}}/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={
                        { vertical: 'top', horizontal: 'right' }
                    }
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                    <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};
