import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    appBarTypography: {
        color: 'black'
    },
}));

const drawerWidth = 400;

const TopBar = props => {
    const classes = useStyles();
    return (
        <AppBar
            elevation={0}
            style={{ background: 'white' }}
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
            colorPrimary='white'
        >
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap component="div" className={classes.appBarTypography}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

TopBar.propTypes = {

};

export default TopBar;