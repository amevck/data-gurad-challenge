import React from 'react';
import { Box } from '@mui/system';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import BottomBar from './BottomBar'
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    headerName: {
        flexGrow: 1,
        textAlign: "center",
        margin: "auto",
        padding: "20px"
    },
    boldHeaderName: {
        fontWeight: "800"
    },
    listItem: {
        color: "black",
        fontSize: "1.2rem !important"
    }
}));

const SideBar = props => {
    const classes = useStyles();
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = <Box >
        <Typography className={classes.headerName} variant="h4">Data<span className={classes.boldHeaderName}>Guard</span></Typography>
        <Divider />
        <Box pt={3}>
            <List>
                {props.menuItems.map((item, index) => (
                    <ListItem component={Link} to={item.route} key={item.name}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText ><span className={classes.listItem}>{item.name}</span></ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
        <Box>
            <BottomBar onAllSelect={props.onAllSelect} pluginsDisabled={props.pluginsDisabled}></BottomBar>
        </Box>
    </Box>

    return (
        <Box
            component="nav"
            sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

SideBar.propTypes = {

};

export default SideBar;