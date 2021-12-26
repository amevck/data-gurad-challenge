import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Switch from '../styled/Switch';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 200,
    width: 300,
    border: '4px solid rgb(205 200 200) !important',
    borderRadius: '10px !important'
  },
  paperDisabled: {
    height: 200,
    width: 300,
    border: '4px solid rgb(227 223 223) !important',
    borderRadius: '10px !important'
  },
  switch: {
    alignContent: "flex-end"
  },
  appBarTypography: {
  },
  appBarTypographyDisabled: {
    color: 'rgb(227 223 223) !important'
  },
  bodyTypography: {
    fontSize: '1rem !important',
  },
  bodyTypographyDisabled: {
    fontSize: '1rem !important',
    color: 'rgb(227 223 223) !important'
  }
}));

const Plugin = props => {

  const classes = useStyles();
  const { title, description, active, checked } = props;
  const onSwitchChanged = (event) => {
    const checked = event.target.checked
    props.handlePluginActivation({ activate: checked, pluginName: props.name })
  }
  return (
    <div>
      <Paper variant="outlined" className={active ? classes.paper : classes.paperDisabled}>
        <Box sx={{ p: 3 }}>
          <Grid container  >
            <Grid item xs={6} >
              <Typography variant="h5" noWrap component="div" className={active ? classes.appBarTypography : classes.appBarTypographyDisabled}>
                {title}
              </Typography>
            </Grid>

            <Grid item xs={6} className={classes.switch}>
              <Box display="flex" justifyContent="flex-end">
                <Switch disabled={!active} checked={checked} onChange={onSwitchChanged}></Switch>
              </Box></Grid>

            <Box display="flex" pt={1}>
              <Typography component="div" className={active ? classes.bodyTypography : classes.bodyTypographyDisabled}>
                {description}
              </Typography>
            </Box>

          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

Plugin.propTypes = {

};

export default Plugin;