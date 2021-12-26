import React from 'react';
import { AppBar, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Switch from '../styled/Switch';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({

    appBarTypography: {
        color: 'black',

    },
    appBar: {
        background: 'rgba(255,255,255,0.5) !important',
        backdropFilter: 'blur(5px) !important'
    }

}));

const BottomBar = props => {
    const classes = useStyles();
    return (
        <AppBar elevation={0}
            className={classes.appBar} position="absolute" color="primary" sx={{ top: 'auto', bottom: 10 }}>
            <Grid container  >
                <Grid item xs={8} >
                    <Box sx={{ pl: 4 }}>
                        <Typography variant="h6" noWrap component="div" className={classes.appBarTypography}>
                            {`All plugins ${!props.pluginsDisabled ? 'enabled' : 'disabled'}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <Box display="flex" >
                        <Switch onChange={props.onAllSelect} defaultChecked={true} activeLabel="1" inactiveLabel=""> </Switch>
                    </Box>
                </Grid>

            </Grid>
        </AppBar>
    );
};

export default BottomBar;