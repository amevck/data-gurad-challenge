import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Plugin from './Plugin';
import { Box } from '@mui/system';
import TopBar from './TopBar';

export default function PluginContainer(props) {
    const { plugins, tabdata, pluginDisabled } = props

    // each plugin state in a map
    const stateAsMap = useMemo(() => {
        const active = Object.fromEntries(tabdata?.[props.name]?.active?.map(e => [e, true]) || [])
        const inactive = Object.fromEntries(tabdata?.[props.name]?.inactive?.map(e => [e, false]) || [])
        const disabled = Object.fromEntries(tabdata?.[props.name]?.disabled?.map(e => [e, 'disabled']) || [])
        return { ...active, ...inactive, ...disabled }

    }, [tabdata, props.name]);

    const isPluginDisabled = (key) => stateAsMap?.[key] === 'disabled' || pluginDisabled

    const isPluginChecked = (key) => stateAsMap?.[key]

    const handlePluginActivation = (data) => {
        props.handlePluginActivation({ ...data, tabName: props.name })
    }
    return (
        <Box>
            <TopBar handleDrawerToggle={props.handleDrawerToggle} title={props.title} />
            <Grid container spacing={7}>
                {Object.keys(plugins).map((key, index) => (
                    <Grid item >
                        <Plugin key={props.name + key + isPluginChecked(key)} {...plugins[key]} active={!isPluginDisabled(key)}
                            checked={isPluginChecked(key)} handlePluginActivation={handlePluginActivation}></Plugin>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}